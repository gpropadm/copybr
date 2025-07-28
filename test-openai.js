const { generateCopy } = require('./src/lib/openai.ts');

async function testOpenAI() {
  console.log('🧪 Testando API da OpenAI...\n');
  
  try {
    const request = {
      template: 'facebook-ad',
      input: 'Curso de programação online para iniciantes',
      tone: 'entusiasmado',
      targetAudience: 'jovens de 18-30 anos'
    };
    
    console.log('📝 Parâmetros do teste:');
    console.log('Template:', request.template);
    console.log('Input:', request.input);
    console.log('Tom:', request.tone);
    console.log('Público:', request.targetAudience);
    console.log('\n⏳ Gerando copy...\n');
    
    const result = await generateCopy(request);
    
    console.log('✅ Resultado:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    result.forEach((copy, index) => {
      console.log(`${index + 1}. ${copy.text}`);
      console.log(`   Score: ${copy.score?.toFixed(1)}\n`);
    });
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
  }
}

testOpenAI();