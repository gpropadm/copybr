import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

export async function POST(req: NextRequest) {
  try {
    const { email, code, userId } = await req.json();

    if (!email || !code) {
      return NextResponse.json({
        error: 'Email e código são obrigatórios'
      }, { status: 400 });
    }

    // Verificar código
    const result = await Database.verifyEmailCode(email, code);

    if (result.success) {
      // Marcar email como verificado no usuário (se userId fornecido)
      if (userId) {
        await Database.markEmailAsVerified(userId);
        console.log(`✅ Email verificado para usuário ${userId}`);
      }

      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      return NextResponse.json({
        error: result.message
      }, { status: 400 });
    }

  } catch (error) {
    console.error('❌ Erro ao verificar código:', error);
    return NextResponse.json({
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// GET para verificação automática via link
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const email = searchParams.get('email');

    if (!email || !code) {
      return NextResponse.redirect(
        new URL('/verificar-email?error=invalid-link', req.url)
      );
    }

    // Verificar código
    const result = await Database.verifyEmailCode(email, code);

    if (result.success) {
      return NextResponse.redirect(
        new URL('/verificar-email?success=true', req.url)
      );
    } else {
      return NextResponse.redirect(
        new URL('/verificar-email?error=invalid-code', req.url)
      );
    }

  } catch (error) {
    console.error('❌ Erro na verificação automática:', error);
    return NextResponse.redirect(
      new URL('/verificar-email?error=server-error', req.url)
    );
  }
}