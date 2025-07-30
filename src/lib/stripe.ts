import Stripe from 'stripe'

// Durante o build, o Stripe pode não estar configurado
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build'

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
})

// Helper para verificar se o Stripe está configurado corretamente
export const isStripeConfigured = () => {
  return process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')
}

export const PLANS = {
  free: {
    name: 'Gratuito',
    price: 0,
    priceId: '', // Não precisa para plano gratuito
    features: {
      monthlyGenerations: 10,
      templates: ['facebook-ad', 'email-subject', 'product-description'],
      watermark: true,
      support: 'email',
      history: false
    }
  },
  starter: {
    name: 'Starter',
    price: 29.90,
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    features: {
      monthlyGenerations: 100,
      templates: 'basic',
      watermark: false,
      support: 'email',
      history: true,
      apiAccess: false
    }
  },
  pro: {
    name: 'Pro',
    price: 97.90,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: {
      monthlyGenerations: 1000,
      templates: 'all',
      watermark: false,
      support: 'priority',
      history: true,
      apiAccess: false,
      analytics: true
    }
  },
  business: {
    name: 'Business',
    price: 197.90,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID!,
    features: {
      monthlyGenerations: -1, // Ilimitado
      templates: 'all',
      watermark: false,
      support: 'vip',
      history: true,
      apiAccess: true,
      analytics: true,
      customTemplates: true,
      dedicatedManager: true
    }
  }
} as const

export type PlanType = keyof typeof PLANS

export async function createCheckoutSession(
  planType: PlanType,
  userId: string,
  userEmail: string
) {
  if (!isStripeConfigured()) {
    throw new Error('Stripe não está configurado corretamente')
  }

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
  if (!isStripeConfigured()) {
    throw new Error('Stripe não está configurado corretamente')
  }

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