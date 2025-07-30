import { NextRequest, NextResponse } from 'next/server';
import { asaas, isAsaasConfigured, PLANS } from '@/lib/asaas';

export async function POST(req: NextRequest) {
  try {
    const { planType = 'starter' } = await req.json();
    
    console.log('🔍 Debug checkout - início');
    console.log('🔑 API configurada:', isAsaasConfigured());
    console.log('📋 Plano:', planType, 'Preço:', PLANS[planType as keyof typeof PLANS]?.price);

    if (!isAsaasConfigured()) {
      return NextResponse.json({ error: 'Asaas não configurado' }, { status: 500 });
    }

    // Step 1: Criar cliente
    console.log('🔄 Step 1: Criando cliente...');
    try {
      const customer = await asaas.customers.new({
        name: 'Teste Debug',
        email: 'debug@copybr.com.br',
        cpfCnpj: '11144477735',
        externalReference: 'debug-user'
      });
      console.log('✅ Cliente criado:', customer);

      // Step 2: Criar cobrança
      console.log('🔄 Step 2: Criando cobrança...');
      const payment = await asaas.payments.new({
        customer: customer.id!,
        billingType: 'UNDEFINED',
        value: 29.90,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        description: 'Teste Debug - CopyBR',
        externalReference: 'debug-payment'
      });
      console.log('✅ Cobrança criada:', payment);

      return NextResponse.json({
        success: true,
        customer: customer,
        payment: payment,
        invoiceUrl: payment.invoiceUrl
      });

    } catch (stepError: any) {
      console.error('❌ Erro no step:', stepError);
      return NextResponse.json({
        error: 'Erro no step',
        details: stepError.message,
        response: stepError.response?.data,
        status: stepError.response?.status
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('❌ Erro geral:', error);
    return NextResponse.json({
      error: 'Erro geral',
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}