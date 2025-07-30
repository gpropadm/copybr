import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail, isEmailConfigured } from '@/lib/email';
import { Database } from '@/lib/database';

export async function POST(req: NextRequest) {
  try {
    const { email, userName } = await req.json();

    if (!email || !userName) {
      return NextResponse.json({
        error: 'Email e nome são obrigatórios'
      }, { status: 400 });
    }

    if (!isEmailConfigured()) {
      return NextResponse.json({
        error: 'Serviço de email não configurado'
      }, { status: 500 });
    }

    // Gerar código de verificação
    const code = await Database.createEmailVerification(email);

    // Enviar email com código
    const result = await sendVerificationEmail(userName, email, code);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Código de verificação enviado com sucesso!',
        emailId: result.data?.id
      });
    } else {
      return NextResponse.json({
        error: 'Falha no envio do email',
        details: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Erro ao enviar código de verificação:', error);
    return NextResponse.json({
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}