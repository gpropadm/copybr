import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// DELETE /api/social/accounts/[id] - Desconectar conta social
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')
    const accountId = params.id
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    // Verificar se a conta pertence ao usuário
    const account = await prisma.socialAccount.findFirst({
      where: {
        id: accountId,
        userId: userId
      }
    })

    if (!account) {
      return NextResponse.json(
        { error: 'Conta não encontrada' },
        { status: 404 }
      )
    }

    // Desativar conta (soft delete)
    await prisma.socialAccount.update({
      where: {
        id: accountId
      },
      data: {
        isActive: false,
        accessToken: '', // Limpar token por segurança
        refreshToken: null,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Conta desconectada com sucesso'
    })

  } catch (error) {
    console.error('Erro ao desconectar conta social:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/social/accounts/[id] - Atualizar conta social
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')
    const accountId = params.id
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { isActive } = body

    // Verificar se a conta pertence ao usuário
    const account = await prisma.socialAccount.findFirst({
      where: {
        id: accountId,
        userId: userId
      }
    })

    if (!account) {
      return NextResponse.json(
        { error: 'Conta não encontrada' },
        { status: 404 }
      )
    }

    // Atualizar conta
    const updatedAccount = await prisma.socialAccount.update({
      where: {
        id: accountId
      },
      data: {
        isActive: isActive ?? account.isActive,
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

  } catch (error) {
    console.error('Erro ao atualizar conta social:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}