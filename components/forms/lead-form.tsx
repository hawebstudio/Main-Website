'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, contactIntentOptions, ContactFormValues } from '@/lib/content/schemas'
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

const INTENT_VALUES = contactIntentOptions.map((option) => option.value) as readonly string[]

export function LeadForm() {
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
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { intent: initialIntent }
  })

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
    } catch (_err) {
      setStatus('error')
      setMessage('An unexpected error occurred. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-primary/5 p-12 text-center border border-primary/10">
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
        <Input id="timestamp" tabIndex={-1} autoComplete="off" defaultValue={formLoadedAt} {...register('timestamp')} />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-destructive border border-destructive/20">
          <AlertCircle className="size-5" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" placeholder="Jane Doe" {...register('name')} />
          {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="jane@example.com" {...register('email')} />
          {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Acme Corp" {...register('company')} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="budget">Budget Range</Label>
          <Input id="budget" placeholder="e.g. $10k - $20k" {...register('budget')} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="intent">I'm interested in *</Label>
        <Controller
          control={control}
          name="intent"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="intent" aria-invalid={!!errors.intent} className="w-full">
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
        {errors.intent && <span className="text-xs text-destructive">{errors.intent.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Project Description *</Label>
        <Textarea 
          id="message" 
          placeholder="Tell us about your project, goals, and timeline..." 
          className="min-h-37.5"
          {...register('message')} 
        />
        {errors.message && <span className="text-xs text-destructive">{errors.message.message}</span>}
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
