import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const isEmailConfigured = () => {
  return process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.length > 10
}

// Template de boas-vindas
export const welcomeEmailTemplate = (userName: string, userEmail: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo ao CopyBR!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #2563eb; font-size: 28px; margin-bottom: 10px;">🎉 Bem-vindo ao CopyBR!</h1>
    <p style="color: #666; font-size: 16px;">Sua jornada para copies incríveis começa agora!</p>
  </div>

  <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
    <h2 style="color: #1e293b; margin-top: 0;">Olá, ${userName}! 👋</h2>
    <p style="margin-bottom: 15px;">Sua conta foi criada com sucesso! Agora você tem acesso a:</p>
    
    <ul style="margin: 20px 0; padding-left: 20px;">
      <li style="margin-bottom: 8px;">✅ <strong>10 copies grátis</strong> por mês</li>
      <li style="margin-bottom: 8px;">✅ <strong>Templates exclusivos</strong> para todas as situações</li>
      <li style="margin-bottom: 8px;">✅ <strong>Projetos ilimitados</strong> para organizar suas copies</li>
      <li style="margin-bottom: 8px;">✅ <strong>IA brasileira</strong> especializada em copywriting</li>
    </ul>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://copybr.vercel.app'}/dashboard" 
       style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
      🚀 Começar a Usar
    </a>
  </div>

  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 30px 0;">
    <h3 style="margin-top: 0; font-size: 18px;">💡 Dica Pro:</h3>
    <p style="margin-bottom: 15px;">Comece criando seu primeiro projeto e teste nossos templates mais populares!</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://copybr.vercel.app'}/dashboard/novo-projeto" 
       style="background: rgba(255,255,255,0.2); color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">
      Criar Primeiro Projeto
    </a>
  </div>

  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
    <p style="color: #64748b; font-size: 14px; text-align: center; margin-bottom: 10px;">
      Precisa de ajuda? Responda este email ou acesse nossa central de ajuda.
    </p>
    <p style="color: #64748b; font-size: 14px; text-align: center; margin: 0;">
      <strong>Equipe CopyBR</strong> 🇧🇷<br>
      A IA brasileira que entende seu negócio
    </p>
  </div>

</body>
</html>
`

// Template de plano ativado
export const planActivatedTemplate = (userName: string, planName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plano ${planName} Ativado!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #059669; font-size: 28px; margin-bottom: 10px;">🎉 Pagamento Confirmado!</h1>
    <p style="color: #666; font-size: 16px;">Seu plano ${planName} está ativo!</p>
  </div>

  <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
    <h2 style="color: #065f46; margin-top: 0;">Parabéns, ${userName}! 🚀</h2>
    <p>Seu pagamento foi processado com sucesso e agora você tem acesso completo ao plano <strong>${planName}</strong>!</p>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://copybr.vercel.app'}/dashboard" 
       style="background: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
      Acessar Dashboard
    </a>
  </div>

  <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
    <p style="color: #64748b; font-size: 14px; text-align: center;">
      <strong>Equipe CopyBR</strong> 🇧🇷
    </p>
  </div>

</body>
</html>
`

// Função para enviar email de boas-vindas
export async function sendWelcomeEmail(userName: string, userEmail: string) {
  if (!isEmailConfigured()) {
    console.log('📧 Email não configurado, pulando envio de boas-vindas')
    return { success: false, error: 'Email não configurado' }
  }

  try {
    console.log(`📧 Enviando email de boas-vindas para ${userEmail}`)
    
    const { data, error } = await resend.emails.send({
      from: 'CopyBR <noreply@copybr.com.br>', // Substituir pelo domínio real
      to: [userEmail],
      subject: `🎉 Bem-vindo ao CopyBR, ${userName}!`,
      html: welcomeEmailTemplate(userName, userEmail),
    })

    if (error) {
      console.error('❌ Erro ao enviar email de boas-vindas:', error)
      return { success: false, error }
    }

    console.log('✅ Email de boas-vindas enviado:', data?.id)
    return { success: true, data }

  } catch (error) {
    console.error('❌ Erro no envio de email:', error)
    return { success: false, error }
  }
}

// Função para enviar email de plano ativado
export async function sendPlanActivatedEmail(userName: string, userEmail: string, planName: string) {
  if (!isEmailConfigured()) {
    console.log('📧 Email não configurado, pulando envio de plano ativado')
    return { success: false, error: 'Email não configurado' }
  }

  try {
    console.log(`📧 Enviando email de plano ativado para ${userEmail}`)
    
    const { data, error } = await resend.emails.send({
      from: 'CopyBR <noreply@copybr.com.br>', // Substituir pelo domínio real
      to: [userEmail],
      subject: `🚀 Seu plano ${planName} está ativo!`,
      html: planActivatedTemplate(userName, planName),
    })

    if (error) {
      console.error('❌ Erro ao enviar email de plano ativado:', error)
      return { success: false, error }
    }

    console.log('✅ Email de plano ativado enviado:', data?.id)
    return { success: true, data }

  } catch (error) {
    console.error('❌ Erro no envio de email:', error)
    return { success: false, error }
  }
}