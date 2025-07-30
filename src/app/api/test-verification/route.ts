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

    // Pegar email da URL se fornecido, senão usar o da conta Resend
    const { searchParams } = new URL(req.url);
    const testEmail = searchParams.get('email') || 'copybradm@gmail.com';
    const testName = searchParams.get('name') || 'Usuário de Teste';

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
        sentTo: testEmail,
        testInstructions: `Use o código ${code} na página /verificar-email para testar`,
        note: testEmail === 'copybradm@gmail.com' 
          ? 'Email enviado para conta verificada do Resend (plano gratuito)'
          : `Tentativa de envio para ${testEmail} - pode falhar no plano gratuito`
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