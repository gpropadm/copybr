import { AsaasClient } from 'asaas'

// Durante o build, o Asaas pode não estar configurado
const ASAAS_API_KEY = process.env.ASAAS_API_KEY || 'dummy_key_for_build'
const IS_SANDBOX = process.env.NODE_ENV !== 'production'

export const asaas = new AsaasClient(ASAAS_API_KEY, {
  sandbox: IS_SANDBOX
})

// Helper para verificar se o Asaas está configurado corretamente
export const isAsaasConfigured = () => {
  return process.env.ASAAS_API_KEY && process.env.ASAAS_API_KEY.length > 10
}

export const PLANS = {
  free: {
    name: 'Gratuito',
    price: 0,
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

interface CheckoutSession {
  url: string
  id: string
  paymentId: string
}

export async function createCheckoutSession(
  planType: PlanType,
  userId: string,
  userEmail: string
): Promise<CheckoutSession> {
  if (!isAsaasConfigured()) {
    throw new Error('Asaas não está configurado corretamente')
  }

  const plan = PLANS[planType]
  
  if (planType === 'free') {
    throw new Error('Plano gratuito não requer checkout')
  }

  try {
    console.log('🔄 Criando cliente no Asaas...');
    // Criar cliente se não existir
    const customer = await asaas.customers.new({
      name: userEmail.split('@')[0],
      email: userEmail,
      cpfCnpj: '11144477735', // CPF válido para testes
      externalReference: userId
    })
    console.log('✅ Cliente criado:', customer.id);

    console.log('🔄 Criando cobrança única (com checkout hospedado)...');
    // Criar cobrança única com checkout hospedado
    const payment = await asaas.payments.new({
      customer: customer.id!,
      billingType: 'UNDEFINED', // Deixa usuário escolher PIX ou cartão
      value: plan.price,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias para pagar
      description: `${plan.name} - CopyBR`,
      externalReference: `${userId}-${planType}`,
      callback: {
        successUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://copybr.vercel.app'}/dashboard?success=true`,
        autoRedirect: true
      }
    })
    console.log('✅ Cobrança criada:', payment.id);

    return {
      url: payment.invoiceUrl || '',
      id: payment.id || '',
      paymentId: payment.id || ''
    }
  } catch (error) {
    console.error('❌ Erro detalhado ao criar checkout:', error)
    console.error('❌ Stack trace:', error instanceof Error ? error.stack : 'No stack')
    throw new Error(`Erro ao criar checkout: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function createPixPayment(
  planType: PlanType,
  userId: string,
  userEmail: string
): Promise<{ pixCode: string; qrCode: string; paymentId: string }> {
  if (!isAsaasConfigured()) {
    throw new Error('Asaas não está configurado corretamente')
  }

  const plan = PLANS[planType]
  
  if (planType === 'free') {
    throw new Error('Plano gratuito não requer checkout')
  }

  try {
    // Criar cliente se não existir
    console.log('🔄 Criando cliente no Asaas...');
    const customer = await asaas.customers.new({
      name: userEmail.split('@')[0],
      email: userEmail,
      cpfCnpj: '11144477735', // CPF válido para testes
      externalReference: userId
    })
    console.log('✅ Cliente criado:', customer.id);

    // Criar cobrança PIX
    console.log('🔄 Criando cobrança PIX...');
    const payment = await asaas.payments.new({
      customer: customer.id!,
      billingType: 'PIX',
      value: plan.price,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h para expirar
      description: `${plan.name} - CopyBR`,
      externalReference: `${userId}-${planType}-onetime`
    })
    console.log('✅ Cobrança criada:', payment.id);

    // Gerar QR Code PIX
    console.log('🔄 Gerando QR Code PIX...');
    const pixInfo = await asaas.payments.getPixQrCode(payment.id!)
    console.log('✅ QR Code gerado');

    return {
      pixCode: pixInfo.payload || '',
      qrCode: pixInfo.encodedImage || '',
      paymentId: payment.id || ''
    }
  } catch (error) {
    console.error('❌ Erro detalhado ao criar pagamento PIX:', error)
    console.error('❌ Stack trace:', error instanceof Error ? error.stack : 'No stack')
    throw new Error(`Erro ao criar pagamento PIX: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getPaymentStatus(paymentId: string) {
  if (!isAsaasConfigured()) {
    throw new Error('Asaas não está configurado corretamente')
  }

  try {
    const payment = await asaas.payments.getById(paymentId)
    return {
      status: payment.status,
      confirmedDate: payment.confirmedDate,
      value: payment.value
    }
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error)
    throw new Error('Erro ao verificar pagamento')
  }
}

export async function cancelSubscription(subscriptionId: string) {
  if (!isAsaasConfigured()) {
    throw new Error('Asaas não está configurado corretamente')
  }

  try {
    await asaas.subscriptions.delete(subscriptionId)
    return { success: true }
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error)
    throw new Error('Erro ao cancelar assinatura')
  }
}

// Função para validar webhook do Asaas
export function validateAsaasWebhook(payload: string, signature: string): boolean {
  // O Asaas usa HMAC SHA256 para validar webhooks
  const crypto = require('crypto')
  const secret = process.env.ASAAS_WEBHOOK_SECRET || ''
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
    
  return signature === expectedSignature
}

// Mapear status do Asaas para nosso sistema
export function mapAsaasStatus(asaasStatus: string): 'active' | 'canceled' | 'past_due' | 'pending' {
  switch (asaasStatus) {
    case 'RECEIVED':
    case 'CONFIRMED':
      return 'active'
    case 'PENDING':
      return 'pending'
    case 'OVERDUE':
      return 'past_due'
    case 'CANCELED':
    case 'REFUNDED':
      return 'canceled'
    default:
      return 'pending'
  }
}