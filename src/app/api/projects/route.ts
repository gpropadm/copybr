import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/projects - Listar projetos do usuário
export async function GET(request: NextRequest) {
  try {
    // Obter userId do header ou sessão
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
    
    const projects = await prisma.project.findMany({
      where: {
        userId: userId
      },
      include: {
        _count: {
          select: {
            copies: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: projects
    })

  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}

// POST /api/projects - Criar novo projeto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, description } = body

    // Obter userId do header
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

    // Validação básica
    if (!name || !type) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Nome e tipo são obrigatórios' 
        },
        { status: 400 }
      )
    }

    if (name.trim().length < 3) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Nome deve ter pelo menos 3 caracteres' 
        },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        userId: userId,
        name: name.trim(),
        type: type,
        description: description?.trim() || null
      }
    })

    return NextResponse.json({
      success: true,
      data: project
    })

  } catch (error) {
    console.error('Erro ao criar projeto:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    )
  }
}