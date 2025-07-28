import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/projects/[id] - Buscar projeto específico
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const projectId = params.id
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Usuário não autenticado' 
        },
        { status: 401 }
      )
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId
      },
      include: {
        copies: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10 // Últimos 10 copies
        },
        _count: {
          select: {
            copies: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Projeto não encontrado' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: project
    })

  } catch (error) {
    console.error('Erro ao buscar projeto:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id] - Atualizar projeto
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const projectId = params.id
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Usuário não autenticado' 
        },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { name, type, description, status } = body

    // Verificar se projeto existe e pertence ao usuário
    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId
      }
    })

    if (!existingProject) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Projeto não encontrado' 
        },
        { status: 404 }
      )
    }

    // Validação básica
    if (name && name.trim().length < 3) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Nome deve ter pelo menos 3 caracteres' 
        },
        { status: 400 }
      )
    }

    const project = await prisma.project.update({
      where: {
        id: projectId
      },
      data: {
        ...(name && { name: name.trim() }),
        ...(type && { type }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(status && { status })
      }
    })

    return NextResponse.json({
      success: true,
      data: project
    })

  } catch (error) {
    console.error('Erro ao atualizar projeto:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - Deletar projeto
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const projectId = params.id
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Usuário não autenticado' 
        },
        { status: 401 }
      )
    }

    // Verificar se projeto existe e pertence ao usuário
    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId
      }
    })

    if (!existingProject) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Projeto não encontrado' 
        },
        { status: 404 }
      )
    }

    await prisma.project.delete({
      where: {
        id: projectId
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Projeto deletado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao deletar projeto:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}