import { NextRequest, NextResponse } from 'next/server'
import { mapAsaasStatus } from '@/lib/asaas'
import { Database } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    console.log('🔔 Webhook Asaas recebido:', body);

    const event = JSON.parse(body)

    console.log('Webhook Asaas recebido:', event.event)

    switch (event.event) {
      case 'PAYMENT_RECEIVED':
      case 'PAYMENT_CONFIRMED':
        await handlePaymentReceived(event.payment)
        break
        
      case 'PAYMENT_OVERDUE':
        await handlePaymentOverdue(event.payment)
        break
        
      case 'PAYMENT_DELETED':
        await handlePaymentDeleted(event.payment)
        break
        
      case 'SUBSCRIPTION_UPDATED':
        await handleSubscriptionUpdated(event.subscription)
        break
        
      case 'SUBSCRIPTION_DELETED':
        await handleSubscriptionDeleted(event.subscription)
        break
        
      default:
        console.log(`Evento não tratado: ${event.event}`)
    }

    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handlePaymentReceived(payment: any) {
  const externalReference = payment.externalReference
  
  if (!externalReference) {
    console.error('ExternalReference ausente no pagamento recebido')
    return
  }

  try {
    // ExternalReference formato: "userId-planType" ou "userId-planType-onetime"
    const [userId, planType, type] = externalReference.split('-')
    
    if (!userId || !planType) {
      console.error('Formato de externalReference inválido:', externalReference)
      return
    }

    // Se for pagamento único (PIX), criar assinatura no banco
    const currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias

    await Database.upsertUser({
      userId,
      email: payment.customer?.email || '',
      customerId: payment.customer?.id || payment.customer,
      subscriptionId: payment.subscription || payment.id,
      planType: planType as any,
      status: 'active',
      currentPeriodEnd
    });
    
    console.log(`✅ Usuário ${userId} ativado no plano ${planType} via ${payment.billingType}`);
    
    // TODO: Enviar email de boas-vindas
    // await sendWelcomeEmail(userId, planType)
    
  } catch (error) {
    console.error('Erro ao processar pagamento recebido:', error)
  }
}

async function handlePaymentOverdue(payment: any) {
  const externalReference = payment.externalReference
  
  if (!externalReference) {
    console.error('ExternalReference ausente no pagamento em atraso')
    return
  }

  try {
    const [userId] = externalReference.split('-')
    
    if (!userId) {
      console.error('Formato de externalReference inválido:', externalReference)
      return
    }

    // Marcar usuário como em atraso, mas não cancelar ainda
    await Database.upsertUser({
      userId,
      status: 'past_due'
    });

    console.log(`⚠️ Usuário ${userId} com pagamento em atraso`);
    
    // TODO: Enviar email de cobrança
    // await sendOverdueEmail(userId)
    
  } catch (error) {
    console.error('Erro ao processar pagamento em atraso:', error)
  }
}

async function handlePaymentDeleted(payment: any) {
  const externalReference = payment.externalReference
  
  if (!externalReference) {
    console.error('ExternalReference ausente no pagamento deletado')
    return
  }

  try {
    const [userId] = externalReference.split('-')
    
    if (!userId) {
      console.error('Formato de externalReference inválido:', externalReference)
      return
    }

    // Cancelar assinatura e voltar para plano gratuito
    await Database.upsertUser({
      userId,
      planType: 'free',
      status: 'canceled',
      currentPeriodEnd: new Date()
    });

    console.log(`❌ Usuário ${userId} cancelado - volta para plano gratuito`);
    
    // TODO: Enviar email de cancelamento
    // await sendCancellationEmail(userId)
    
  } catch (error) {
    console.error('Erro ao processar pagamento deletado:', error)
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  const externalReference = subscription.externalReference
  
  if (!externalReference) {
    console.error('ExternalReference ausente na atualização de assinatura')
    return
  }

  try {
    const [userId, planType] = externalReference.split('-')
    
    if (!userId || !planType) {
      console.error('Formato de externalReference inválido:', externalReference)
      return
    }

    const status = mapAsaasStatus(subscription.status)
    const nextDueDate = subscription.nextDueDate ? new Date(subscription.nextDueDate) : new Date()

    await Database.upsertUser({
      userId,
      planType: planType as any,
      status,
      currentPeriodEnd: nextDueDate
    });

    console.log(`✅ Assinatura do usuário ${userId} atualizada para ${planType} com status ${status}`);
    
  } catch (error) {
    console.error('Erro ao processar atualização de assinatura:', error)
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  const externalReference = subscription.externalReference
  
  if (!externalReference) {
    console.error('ExternalReference ausente na exclusão de assinatura')
    return
  }

  try {
    const [userId] = externalReference.split('-')
    
    if (!userId) {
      console.error('Formato de externalReference inválido:', externalReference)
      return
    }

    // Downgrade para plano gratuito
    await Database.upsertUser({
      userId,
      planType: 'free',
      status: 'canceled',
      currentPeriodEnd: new Date()
    });

    console.log(`✅ Usuário ${userId} cancelado - volta para plano gratuito`);
    
    // TODO: Enviar email de cancelamento
    // await sendCancellationEmail(userId)
    
  } catch (error) {
    console.error('Erro ao processar cancelamento de assinatura:', error)
  }
}