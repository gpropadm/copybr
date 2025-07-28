const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function resetPassword() {
  try {
    const email = 'teste@copybr.com'
    const newPassword = '123456'
    
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })

    console.log('Senha atualizada com sucesso!')
    console.log('Email:', email)
    console.log('Nova senha:', newPassword)
    
  } catch (error) {
    console.error('Erro ao atualizar senha:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetPassword()