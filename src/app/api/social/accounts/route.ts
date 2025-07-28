import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/social/accounts - Listar contas sociais do usuário
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    const socialAccounts = await prisma.socialAccount.findMany({
      where: {
        userId: userId,
        isActive: true
      },
      select: {
        id: true,
        platform: true,
        username: true,
        isActive: true,
        createdAt: true,
        // Não incluir tokens por segurança
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: socialAccounts
    })

  } catch (error) {
    console.error('Erro ao buscar contas sociais:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/social/accounts - Conectar nova conta social
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { platform, username, accessToken, refreshToken, expiresAt } = body

    // Validação
    if (!platform || !username || !accessToken) {
      return NextResponse.json(
        { error: 'Platform, username e accessToken são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se já existe conta desta plataforma para este usuário
    const existingAccount = await prisma.socialAccount.findUnique({
      where: {
        userId_platform: {
          userId: userId,
          platform: platform.toUpperCase()
        }
      }
    })

    if (existingAccount) {
      // Atualizar conta existente
      const updatedAccount = await prisma.socialAccount.update({
        where: {
          id: existingAccount.id
        },
        data: {
          username,
          accessToken,
          refreshToken,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
          isActive: true,
          updatedAt: new Date()
        },
        select: {
          id: true,
          platform: true,
          username: true,
          isActive: true,
          createdAt: true,
        }
      })

      return NextResponse.json({
        success: true,
        data: updatedAccount,
        message: 'Conta atualizada com sucesso'
      })
    } else {
      // Criar nova conta
      const newAccount = await prisma.socialAccount.create({
        data: {
          userId,
          platform: platform.toUpperCase(),
          username,
          accessToken,
          refreshToken,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
          isActive: true
        },
        select: {
          id: true,
          platform: true,
          username: true,
          isActive: true,
          createdAt: true,
        }
      })

      return NextResponse.json({
        success: true,
        data: newAccount,
        message: 'Conta conectada com sucesso'
      })
    }

  } catch (error) {
    console.error('Erro ao conectar conta social:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}