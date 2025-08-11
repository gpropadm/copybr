// Teste simples da API Anthropic
const Anthropic = require('@anthropic-ai/sdk')

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function testAPI() {
  try {
    console.log('Testando API Anthropic...')
    console.log('API Key presente:', !!process.env.ANTHROPIC_API_KEY)
    console.log('API Key length:', process.env.ANTHROPIC_API_KEY?.length || 0)
    
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Diga apenas 'teste funcionando'"
        }
      ]
    })
    
    console.log('✅ Sucesso!', message.content[0]?.text)
  } catch (error) {
    console.error('❌ Erro:', error.message)
    console.error('Status:', error.status)
    console.error('Type:', error.type)
  }
}

testAPI()