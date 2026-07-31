# Billing Process Guide

## Overview

The invoicing and payment system manages the entire billing lifecycle from quote to payment collection. It supports multiple payment methods, tax calculations, and payment tracking.

## Invoice Lifecycle

### Invoice Status

1. **Draft** - Invoice being created
2. **Sent** - Invoice sent to client
3. **Viewed** - Client has viewed invoice
4. **Partial** - Partial payment received
5. **Paid** - Fully paid
6. **Overdue** - Past due date
7. **Cancelled** - Invoice cancelled

### Status Transitions

```
Draft → Sent → Viewed → Partial → Paid
              ↓
            Overdue
              ↓
            Cancelled
```

## Invoice Creation

### Create an Invoice

```typescript
import { createInvoice } from '@/lib/invoicing'

const invoice = await createInvoice({
  projectId: 'project-id',
  clientId: 'client-id',
  proposalId: 'proposal-id',
  invoiceNumber: 'INV-2024-001',
  status: 'draft',
  subtotal: 10000,
  tax: 800,
  total: 10800,
  currency: 'USD',
  dueDate: '2024-02-15',
})
```

### Create from Project

```typescript
import { createInvoice } from '@/lib/invoicing'
import { getProjectById } from '@/lib/projects'

const project = await getProjectById('project-id')
const invoice = await createInvoice({
  projectId: project.id,
  clientId: project.clientId,
  invoiceNumber: `INV-${Date.now()}`,
  status: 'sent',
  subtotal: project.actualBudget || project.estimatedBudget || 0,
  tax: 0,
  total: project.actualBudget || project.estimatedBudget || 0,
  currency: 'USD',
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
})
```

## Invoice Line Items

### Create Line Item

```typescript
import { createInvoiceLineItem } from '@/lib/invoicing'

const lineItem = await createInvoiceLineItem({
  invoiceId: 'invoice-id',
  description: 'Web Development Services',
  quantity: 1,
  unitPrice: 10000,
  total: 10000,
  order: 1,
})
```

### Get Line Items by Invoice

```typescript
import { getLineItemsByInvoice } from '@/lib/invoicing'

const lineItems = await getLineItemsByInvoice('invoice-id')
```

## Payment Processing

### Create Payment

```typescript
import { createPayment } from '@/lib/invoicing'

const payment = await createPayment({
  invoiceId: 'invoice-id',
  amount: 5400,
  status: 'completed',
  method: 'stripe',
  transactionId: 'pi_1234567890',
  paidAt: new Date().toISOString(),
})
```

### Payment Methods

- **stripe** - Stripe payment
- **razorpay** - Razorpay payment
- **bank-transfer** - Bank transfer
- **check** - Check payment
- **other** - Other method

### Payment Status

- **pending** - Payment pending
- **processing** - Payment processing
- **completed** - Payment completed
- **failed** - Payment failed
- **refunded** - Payment refunded

## Invoice Management

### Get Invoice by ID

```typescript
import { getInvoiceById } from '@/lib/invoicing'

const invoice = await getInvoiceById('invoice-id')
```

### Get Invoices by Project

```typescript
import { getInvoicesByProject } from '@/lib/invoicing'

const invoices = await getInvoicesByProject('project-id')
```

### Get Invoices by Client

```typescript
import { getInvoicesByClient } from '@/lib/invoicing`

const invoices = await getInvoicesByClient('client-id')
```

### Update Invoice

```typescript
import { updateInvoice } from '@/lib/invoicing'

const updated = await updateInvoice('invoice-id', {
  status: 'paid',
  paidAt: new Date().toISOString(),
})
```

## Tax Calculation

### Calculate Tax

```typescript
function calculateTax(subtotal: number, taxRate: number): number {
  return subtotal * (taxRate / 100)
}

const subtotal = 10000
const taxRate = 8 // 8%
const tax = calculateTax(subtotal, taxRate) // 800
const total = subtotal + tax // 10800
```

### Tax by Region

```typescript
const taxRates = {
  'US-CA': 8.25, // California
  'US-NY': 8.875, // New York
  'GB': 20, // UK VAT
  'DE': 19, // Germany VAT
}

const rate = taxRates['US-CA'] || 0
```

## Invoice Workflow

### Step 1: Create Invoice

```typescript
const invoice = await createInvoice({
  projectId: 'project-id',
  clientId: 'client-id',
  invoiceNumber: 'INV-2024-001',
  status: 'draft',
  subtotal: 10000,
  tax: 800,
  total: 10800,
  currency: 'USD',
})
```

### Step 2: Add Line Items

```typescript
await createInvoiceLineItem({
  invoiceId: invoice.id,
  description: 'Service 1',
  quantity: 1,
  unitPrice: 5000,
  total: 5000,
  order: 1,
})

await createInvoiceLineItem({
  invoiceId: invoice.id,
  description: 'Service 2',
  quantity: 1,
  unitPrice: 5000,
  total: 5000,
  order: 2,
})
```

### Step 3: Review and Send

```typescript
await updateInvoice(invoice.id, {
  status: 'sent',
  dueDate: '2024-02-15',
})
```

### Step 4: Track Payment

```typescript
await createPayment({
  invoiceId: invoice.id,
  amount: 5400,
  status: 'completed',
  method: 'stripe',
  transactionId: 'pi_1234567890',
  paidAt: new Date().toISOString(),
})
```

### Step 5: Mark as Paid

```typescript
const invoice = await getInvoiceById('invoice-id')
const totalPaid = invoice.amountPaid + 5400

await updateInvoice(invoice.id, {
  amountPaid: totalPaid,
  status: totalPaid >= invoice.total ? 'paid' : 'partial',
})
```

## Payment Integration

### Stripe Integration

```typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Create payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: invoice.total * 100, // cents
  currency: invoice.currency.toLowerCase(),
  metadata: { invoiceId: invoice.id },
})

// Handle webhook
const event = stripe.webhooks.constructEvent(
  payload,
  signature,
  webhookSecret
)

if (event.type === 'payment_intent.succeeded') {
  await createPayment({
    invoiceId: event.data.object.metadata.invoiceId,
    amount: event.data.object.amount / 100,
    status: 'completed',
    method: 'stripe',
    transactionId: event.data.object.id,
    paidAt: new Date().toISOString(),
  })
}
```

### Razorpay Integration

```typescript
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Create order
const order = await razorpay.orders.create({
  amount: invoice.total * 100, // paise
  currency: invoice.currency,
  receipt: invoice.invoiceNumber,
  notes: { invoiceId: invoice.id },
})

// Handle webhook
// Verify signature and create payment
```

## Invoice Metrics

### Get Invoice Metrics

```typescript
import { getInvoiceMetrics } from '@/lib/invoicing'

const metrics = await getInvoiceMetrics()
// Returns: { total, paid, overdue, totalRevenue, outstandingRevenue }
```

### Revenue by Period

```typescript
const invoices = await getAllInvoices()
const thisMonth = invoices.filter(i => 
  i.status === 'paid' && new Date(i.paidAt).getMonth() === new Date().getMonth()
)
const monthlyRevenue = thisMonth.reduce((sum, i) => sum + i.amountPaid, 0)
```

### Outstanding Invoices

```typescript
const invoices = await getAllInvoices()
const outstanding = invoices.filter(i => 
  i.status !== 'paid' && i.status !== 'cancelled'
)
const outstandingAmount = outstanding.reduce((sum, i) => sum + (i.total - i.amountPaid), 0)
```

### Overdue Invoices

```typescript
const invoices = await getAllInvoices()
const overdue = invoices.filter(i => 
  i.status !== 'paid' && 
  i.status !== 'cancelled' && 
  new Date(i.dueDate) < new Date()
)
```

## Best Practices

### Invoice Creation

1. **Clear line items**
   - Detailed descriptions
   - Quantities specified
   - Unit prices clear

2. **Accurate calculations**
   - Verify subtotal
   - Calculate tax correctly
   - Check total

3. **Professional formatting**
   - Consistent layout
   - Company branding
   - Contact information

### Payment Tracking

1. **Record all payments**
   - Link to invoice
   - Include transaction ID
   - Note payment method

2. **Follow up on overdue**
   - Send reminders
   - Track communication
   - Escalate as needed

3. **Reconcile regularly**
   - Match payments
   - Update status
   - Generate reports

### Tax Compliance

1. **Know your rates**
   - Research local tax laws
   - Apply correct rates
   - Document exemptions

2. **Keep records**
   - Store invoices
   - Track payments
   - Maintain audit trail

## Integration with Other Systems

### Projects

Create invoice from project completion:

```typescript
import { createInvoice } from '@/lib/invoicing'
import { getProjectById } from '@/lib/projects'

const project = await getProjectById('project-id')
const invoice = await createInvoice({
  projectId: project.id,
  clientId: project.clientId,
  invoiceNumber: `INV-${Date.now()}`,
  status: 'sent',
  subtotal: project.actualBudget || project.estimatedBudget || 0,
  tax: 0,
  total: project.actualBudget || project.estimatedBudget || 0,
  currency: 'USD',
})
```

### Proposals

Create invoice from proposal:

```typescript
import { createInvoice } from '@/lib/invoicing'
import { getProposalById } from '@/lib/proposals'

const proposal = await getProposalById('proposal-id')
const invoice = await createInvoice({
  proposalId: proposal.id,
  clientId: proposal.clientId,
  invoiceNumber: `INV-${Date.now()}`,
  status: 'sent',
  subtotal: proposal.subtotal,
  tax: proposal.tax,
  total: proposal.total,
  currency: proposal.currency,
})
```

## Invoice API

### Invoices API

**Create Invoice:** `POST /api/invoices`
**Get Invoice:** `GET /api/invoices/:id`
**Get All Invoices:** `GET /api/invoices`
**Update Invoice:** `PATCH /api/invoices/:id`
**Delete Invoice:** `DELETE /api/invoices/:id`

### Line Items API

**Create Line Item:** `POST /api/invoices/:id/line-items`
**Get Line Items:** `GET /api/invoices/:id/line-items`

### Payments API

**Create Payment:** `POST /api/invoices/:id/payments`
**Get Payments:** `GET /api/invoices/:id/payments`

## Troubleshooting

### Invoice Not Creating

- Check required fields
- Verify project/client ID exists
- Check user permissions

### Payment Not Recording

- Verify invoice ID is valid
- Check payment amount
- Ensure transaction ID is unique

### Tax Calculation Errors

- Verify tax rate
- Check subtotal calculation
- Review tax rules
