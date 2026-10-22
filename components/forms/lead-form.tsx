'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm, Controller, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, contactIntentOptions, budgetOptions, ContactFormValues } from '@/lib/content/schemas'
import { submitContactForm } from '@/app/(marketing)/contact/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { analyticsEvents, trackEvent } from '@/lib/analytics/events'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import type { Promotion } from '@/lib/content/types'

const INTENT_VALUES = contactIntentOptions.map((option) => option.value) as readonly string[]

interface LeadFormProps {
  // Sourced from `content/promotion/` via `getActivePromotion()`. When
  // present, its `campaignId` is used to attribute enquiries that reach
  // the form without an explicit `?campaign=` query param (e.g. someone
  // who saw the promotion banner and scrolled straight to the form).
  promotion?: Promotion | null
}

export function LeadForm({ promotion = null }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [formLoadedAt] = useState(() => String(Date.now()))

  const searchParams = useSearchParams()
  const intentParam = searchParams.get('intent')
  const initialIntent = intentParam && INTENT_VALUES.includes(intentParam) ? intentParam : ''

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    setFocus,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { intent: initialIntent }
  })

  const selectedBudget = watch('budget')
  const errorCount = Object.keys(errors).length

  // The order a keyboard or screen-reader user meets the fields in is also the
  // order the first error should be reported in (WCAG 3.3.1).
  const fieldOrder: Array<keyof ContactFormValues> = [
    'name',
    'email',
    'company',
    'budget',
    'customBudget',
    'intent',
    'message',
  ]

  const onInvalid = (formErrors: FieldErrors<ContactFormValues>) => {
    const firstInvalid = fieldOrder.find((field) => formErrors[field])
    if (firstInvalid) setFocus(firstInvalid)
  }

  // Capture where the lead came from once we're on the client, so
  // server-rendered and hydrated markup stay in sync (no SSR mismatch).
  useEffect(() => {
    // Same-origin referrer -> the page the visitor was on before opening
    // the form (e.g. "/services/website-redesign"). Cross-site referrers
    // aren't a "source page" in our own funnel, so they're left blank.
    try {
      if (document.referrer) {
        const referrerUrl = new URL(document.referrer)
        if (referrerUrl.origin === window.location.origin) {
          setValue('sourcePage', referrerUrl.pathname)
        }
      }
    } catch {
      // Malformed/unavailable referrer — leave sourcePage unset.
    }

    const campaign = searchParams.get('campaign')
    const utmSource = searchParams.get('utm_source')
    const utmMedium = searchParams.get('utm_medium')
    const utmCampaign = searchParams.get('utm_campaign')
    const utmContent = searchParams.get('utm_content')

    if (campaign) {
      setValue('campaign', campaign)
    } else if (promotion) {
      // No explicit ?campaign= param — attribute to the active promotion
      // if one is running, so enquiries reached via the on-page banner
      // (rather than the popup's CTA link) still get credited.
      setValue('campaign', promotion.campaignId)
    }
    if (utmSource) setValue('utmSource', utmSource)
    if (utmMedium) setValue('utmMedium', utmMedium)
    if (utmCampaign) setValue('utmCampaign', utmCampaign)
    if (utmContent) setValue('utmContent', utmContent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('submitting')
    try {
      const response = await submitContactForm(data)
      if (response.success) {
        trackEvent(analyticsEvents.formSubmit, { form: 'contact' })
        setStatus('success')
        setMessage(response.message)
        reset()
      } else {
        setStatus('error')
        setMessage(response.message)
      }
    } catch {
      setStatus('error')
      setMessage('An unexpected error occurred. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-primary/5 p-12 text-center border border-primary/10">
        <CheckCircle2 className="size-16 text-primary" />
        <h3 className="text-2xl font-semibold text-primary">Enquiry Sent</h3>
        <p className="text-muted-foreground">{message}</p>
        <Button variant="outline" className="mt-4" onClick={() => setStatus('idle')}>
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-6">
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
        <Input id="timestamp" tabIndex={-1} autoComplete="off" defaultValue={formLoadedAt} {...register('timestamp')} />
        <input type="hidden" {...register('sourcePage')} />
        <input type="hidden" {...register('campaign')} />
        <input type="hidden" {...register('utmSource')} />
        <input type="hidden" {...register('utmMedium')} />
        <input type="hidden" {...register('utmCampaign')} />
        <input type="hidden" {...register('utmContent')} />
      </div>

      {status === 'error' && (
        <div role="alert" className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-destructive border border-destructive/20">
          <AlertCircle className="size-5" aria-hidden="true" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {/* One announcement for the whole invalid submit; each message below stays
          linked to its own field through aria-describedby. */}
      {errorCount > 0 && (
        <div role="alert" className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-destructive border border-destructive/20">
          <AlertCircle className="size-5" aria-hidden="true" />
          <p className="text-sm font-medium">
            {errorCount === 1
              ? 'One field needs your attention.'
              : `${errorCount} fields need your attention.`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="Jane Doe"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <span id="name-error" className="text-xs text-destructive">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <span id="email-error" className="text-xs text-destructive">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Acme Corp"
            autoComplete="organization"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? 'company-error' : undefined}
            {...register('company')}
          />
          {errors.company && (
            <span id="company-error" className="text-xs text-destructive">
              {errors.company.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="budget">Project Budget</Label>
          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger
                  id="budget"
                  aria-invalid={errors.budget ? true : undefined}
                  aria-describedby={errors.budget ? 'budget-error' : undefined}
                  className="w-full"
                >
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.budget && (
            <span id="budget-error" className="text-xs text-destructive">
              {errors.budget.message}
            </span>
          )}
        </div>
      </div>

      {selectedBudget === 'custom' && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="customBudget">Enter your approximate budget</Label>
          <Input
            id="customBudget"
            placeholder="e.g. $15,000"
            className="w-full min-w-0"
            aria-invalid={errors.customBudget ? true : undefined}
            aria-describedby={errors.customBudget ? 'customBudget-error' : undefined}
            {...register('customBudget')}
          />
          {errors.customBudget && (
            <span id="customBudget-error" className="text-xs text-destructive">
              {errors.customBudget.message}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="intent">I'm interested in *</Label>
        <Controller
          control={control}
          name="intent"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="intent"
                aria-required="true"
                aria-invalid={!!errors.intent}
                aria-describedby={errors.intent ? 'intent-error' : undefined}
                className="w-full"
              >
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {contactIntentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.intent && (
          <span id="intent-error" className="text-xs text-destructive">
            {errors.intent.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Project Description *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project, goals, and timeline..."
          className="min-h-37.5"
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <span id="message-error" className="text-xs text-destructive">
            {errors.message.message}
          </span>
        )}
      </div>

      <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full md:w-auto self-start">
        {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
      </Button>

      <p className="text-xs text-muted-foreground mt-4">
        Your information is kept strictly confidential. We usually respond within 24 hours.
      </p>
    </form>
  )
}
