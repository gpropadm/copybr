const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    // Verificar se já existe algum usuário
    const userCount = await prisma.user.count()
    console.log(`Usuários existentes: ${userCount}`)

    if (userCount === 0) {
      // Criar usuário de teste
      const hashedPassword = await bcrypt.hash('123456', 12)
      
      const user = await prisma.user.create({
        data: {
          email: 'admin@copybr.com',
          name: 'Admin CopyBR',
          password: hashedPassword,
          plan: 'PRO'
        }
      })

      console.log('Usuário criado com sucesso:')
      console.log('Email: admin@copybr.com')
      console.log('Senha: 123456')
      console.log('ID:', user.id)
    } else {
      // Listar usuários existentes
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          plan: true,
          createdAt: true
        }
      })
      
      console.log('Usuários existentes:')
      users.forEach(user => {
        console.log(`- ${user.email} (${user.name}) - Plano: ${user.plan}`)
      })
    }
  } catch (error) {
    console.error('Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()