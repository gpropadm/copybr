const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function recreateUsers() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 12)
    
    const users = [
      {
        email: 'brasiliasite@gmail.com',
        name: 'ALEX VIEIRA DA SILVA',
        plan: 'FREE'
      },
      {
        email: 'teste@copybr.com',
        name: 'Usuário Teste',
        plan: 'FREE'
      },
      {
        email: 'paulo@gmail.com',
        name: 'Paulo',
        plan: 'FREE'
      },
      {
        email: 'dev@copybr.com',
        name: 'Usuário de Desenvolvimento',
        plan: 'FREE'
      }
    ]

    for (const userData of users) {
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword
        }
      })
      console.log(`✅ Criado: ${user.email}`)
    }

    console.log('\n🔐 Todos os usuários têm a senha: 123456')
    console.log('\nUsuários disponíveis:')
    users.forEach(user => {
      console.log(`- ${user.email} (${user.name})`)
    })

  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

recreateUsers()