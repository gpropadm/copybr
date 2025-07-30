import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail, sendPlanActivatedEmail, isEmailConfigured } from '@/lib/email';

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 Testando configuração de email...');
    
    if (!isEmailConfigured()) {
      return NextResponse.json({
        error: 'Email não configurado',
        message: 'Adicione RESEND_API_KEY nas variáveis de ambiente'
      }, { status: 500 });
    }

    // Teste com dados demo
    const testName = 'Alex Vieira da Silva';
    const testEmail = 'brasiliasite@gmail.com'; // Usar seu email real para teste

    console.log('📧 Enviando email de teste...');
    const result = await sendWelcomeEmail(testName, testEmail);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email de boas-vindas enviado com sucesso!',
        emailId: result.data?.id
      });
    } else {
      return NextResponse.json({
        error: 'Falha no envio',
        details: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Erro no teste de email:', error);
    return NextResponse.json({
      error: 'Erro interno',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { type, userName, userEmail, planName } = await req.json();

    if (!isEmailConfigured()) {
      return NextResponse.json({
        error: 'Email não configurado'
      }, { status: 500 });
    }

    let result;
    
    if (type === 'welcome') {
      result = await sendWelcomeEmail(userName, userEmail);
    } else if (type === 'plan-activated') {
      result = await sendPlanActivatedEmail(userName, userEmail, planName);
    } else {
      return NextResponse.json({
        error: 'Tipo de email inválido. Use "welcome" ou "plan-activated"'
      }, { status: 400 });
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Email ${type} enviado com sucesso!`,
        emailId: result.data?.id
      });
    } else {
      return NextResponse.json({
        error: 'Falha no envio',
        details: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Erro no envio de email:', error);
    return NextResponse.json({
      error: 'Erro interno',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}