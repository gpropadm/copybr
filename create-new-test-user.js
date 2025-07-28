const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createNewTestUser() {
  try {
    // Criar novo usuário de teste com senha conhecida
    const hashedPassword = await bcrypt.hash('123456', 12)
    
    const user = await prisma.user.create({
      data: {
        email: 'admin@teste.com',
        name: 'Administrador Teste',
        password: hashedPassword,
        plan: 'PRO'
      }
    })

    console.log('✅ Usuário de teste criado com sucesso!')
    console.log('📧 Email: admin@teste.com')
    console.log('🔐 Senha: 123456')
    console.log('🆔 ID:', user.id)
    console.log('\nVocê pode usar essas credenciais para fazer login.')

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createNewTestUser()