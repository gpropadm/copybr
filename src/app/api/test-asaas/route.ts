import { NextRequest, NextResponse } from 'next/server';
import { asaas, isAsaasConfigured } from '@/lib/asaas';

export async function GET(req: NextRequest) {
  try {
    console.log('🔑 API Key configurada:', isAsaasConfigured());
    console.log('🌍 Environment:', process.env.NODE_ENV);
    
    if (!isAsaasConfigured()) {
      return NextResponse.json({
        error: 'Asaas não configurado',
        apiKey: process.env.ASAAS_API_KEY ? 'definida' : 'não definida'
      });
    }

    // Teste simples: listar clientes
    console.log('📋 Testando listagem de clientes...');
    const customers = await asaas.customers.list({ limit: 1 });
    
    return NextResponse.json({
      success: true,
      message: 'Asaas funcionando!',
      customers: customers.data?.length || 0
    });

  } catch (error) {
    console.error('❌ Erro no teste Asaas:', error);
    return NextResponse.json({
      error: 'Erro no teste',
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}