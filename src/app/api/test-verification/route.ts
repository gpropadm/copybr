import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail, isEmailConfigured } from '@/lib/email';
import { Database } from '@/lib/database';

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 Testando sistema de verificação de email...');
    
    if (!isEmailConfigured()) {
      return NextResponse.json({
        error: 'Email não configurado',
        message: 'Adicione RESEND_API_KEY nas variáveis de ambiente'
      }, { status: 500 });
    }

    // Dados de teste
    const testEmail = 'copybradm@gmail.com'; // Email da conta Resend
    const testName = 'Alex Vieira da Silva';

    console.log('📧 Gerando código de verificação...');
    const code = await Database.createEmailVerification(testEmail);

    console.log('📧 Enviando email de verificação...');
    const result = await sendVerificationEmail(testName, testEmail, code);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email de verificação enviado com sucesso!',
        emailId: result.data?.id,
        testCode: code, // Para facilitar os testes
        testInstructions: `Use o código ${code} na página /verificar-email para testar`
      });
    } else {
      return NextResponse.json({
        error: 'Falha no envio',
        details: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Erro no teste de verificação:', error);
    return NextResponse.json({
      error: 'Erro interno',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, userName, testCode } = await req.json();

    if (!isEmailConfigured()) {
      return NextResponse.json({
        error: 'Email não configurado'
      }, { status: 500 });
    }

    let code;
    
    if (testCode) {
      // Usar código específico para teste
      code = testCode;
      const verification = {
        email,
        code,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
        attempts: 0,
        createdAt: new Date()
      };
      
      // Simular criação do código para teste
      console.log(`📧 Código de teste criado: ${code}`);
    } else {
      // Gerar código normal
      code = await Database.createEmailVerification(email);
    }

    const result = await sendVerificationEmail(userName, email, code);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email de verificação enviado!',
        emailId: result.data?.id,
        code: code // Para facilitar teste
      });
    } else {
      return NextResponse.json({
        error: 'Falha no envio',
        details: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Erro no envio de verificação:', error);
    return NextResponse.json({
      error: 'Erro interno',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}