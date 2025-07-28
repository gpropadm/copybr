import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY não encontrada nas variáveis de ambiente')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
})

export const PLANS = {
  free: {
    name: 'Gratuito',
    price: 0,
    priceId: '', // Não precisa para plano gratuito
    features: {
      monthlyGenerations: 5,
      templates: ['facebook-ad', 'email-subject', 'product-description'],
      watermark: true,
      support: 'email',
      history: false
    }
  },
  pro: {
    name: 'Pro',
    price: 47,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: {
      monthlyGenerations: 200,
      templates: 'all',
      watermark: false,
      support: 'priority',
      history: true,
      apiAccess: false
    }
  },
  premium: {
    name: 'Premium',
    price: 97,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
    features: {
      monthlyGenerations: -1, // Ilimitado
      templates: 'all',
      watermark: false,
      support: 'vip',
      history: true,
      apiAccess: true,
      earlyAccess: true
    }
  }
} as const

export type PlanType = keyof typeof PLANS

export async function createCheckoutSession(
  planType: PlanType,
  userId: string,
  userEmail: string
) {
  const plan = PLANS[planType]
  
  if (planType === 'free') {
    throw new Error('Plano gratuito não requer checkout')
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: userEmail,
    client_reference_id: userId,
    line_items: [
      {
        price: plan.priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/precos?canceled=true`,
    metadata: {
      userId,
      planType,
    },
    subscription_data: {
      metadata: {
        userId,
        planType,
      },
    },
  })

  return session
}

export async function createBillingPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })

  return session
}

export async function getPlanByPriceId(priceId: string): Promise<PlanType | null> {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.priceId === priceId) {
      return key as PlanType
    }
  }
  return null
}