import { NextRequest, NextResponse } from 'next/server'
import { stripe, getPlanByPriceId } from '@/lib/stripe'
import { Database } from '@/lib/database'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Erro de verificação do webhook:', err)
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
        
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
        
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break
        
      default:
        console.log(`Evento não tratado: ${event.type}`)
    }

    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  const planType = session.metadata?.planType
  
  if (!userId || !planType) {
    console.error('Metadata ausente no checkout completo')
    return
  }

  try {
    // Atualizar usuário no banco de dados
    await Database.upsertUser({
      userId,
      email: session.customer_email || '',
      customerId: session.customer as string,
      subscriptionId: session.subscription as string,
      planType: planType as any,
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
    });
    
    console.log(`✅ Usuário ${userId} ativado no plano ${planType}`);
    
    // TODO: Enviar email de boas-vindas
    // await sendWelcomeEmail(userId, planType)
    
  } catch (error) {
    console.error('Erro ao processar checkout completo:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  
  if (!userId) {
    console.error('Metadata ausente na atualização de assinatura')
    return
  }

  try {
    const priceId = subscription.items.data[0]?.price.id
    const planType = priceId ? await getPlanByPriceId(priceId) : null
    
    if (!planType) {
      console.error('Plano não encontrado para priceId:', priceId)
      return
    }

    // Atualizar no banco de dados
    await Database.upsertUser({
      userId,
      planType,
      status: subscription.status as any,
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000)
    });

    console.log(`✅ Assinatura do usuário ${userId} atualizada para ${planType}`);
    
  } catch (error) {
    console.error('Erro ao processar atualização de assinatura:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  
  if (!userId) {
    console.error('Metadata ausente na exclusão de assinatura')
    return
  }

  try {
    // Downgrade para plano gratuito
    await Database.upsertUser({
      userId,
      planType: 'free',
      status: 'canceled',
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000)
    });

    console.log(`✅ Usuário ${userId} cancelado - volta para plano gratuito`);
    
    // TODO: Enviar email de cancelamento
    // await sendCancellationEmail(userId)
    
  } catch (error) {
    console.error('Erro ao processar cancelamento de assinatura:', error)
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  
  try {
    console.log(`Pagamento falhou para customer ${customerId}`)
    
    // Notificar o usuário sobre a falha no pagamento
    // await sendPaymentFailedEmail(customerId)
    
  } catch (error) {
    console.error('Erro ao processar falha de pagamento:', error)
  }
}