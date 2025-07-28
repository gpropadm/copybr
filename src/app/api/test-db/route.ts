import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Teste simples de conexão
    await prisma.$connect()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Banco conectado com sucesso!',
      databaseUrl: process.env.DATABASE_URL ? 'URL definida' : 'URL não definida'
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}