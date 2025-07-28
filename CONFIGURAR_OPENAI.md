# 🚀 Como Configurar a API da OpenAI

## ✅ Checklist Rápido

- [ ] 1. Criar conta na OpenAI
- [ ] 2. Obter API Key
- [ ] 3. Configurar billing
- [ ] 4. Adicionar chave no projeto
- [ ] 5. Testar

---

## 🔑 Passo 1: Obter API Key

1. **Acesse:** https://platform.openai.com
2. **Login/Cadastro** 
3. **Vá em:** API Keys (menu lateral esquerdo)
4. **Clique:** "Create new secret key"
5. **Nome:** "CopyBR Local Dev"
6. **Copie a chave:** `sk-proj-xxxxxxxxxxxxx`

⚠️ **IMPORTANTE:** A chave só aparece UMA vez! Guarde bem!

---

## 💳 Passo 2: Configurar Billing

1. **Vá em:** Settings → Billing
2. **Add payment method** (cartão obrigatório)
3. **Set usage limits:** 
   - Hard limit: $10 (para começar)
   - Soft limit: $5 (alerta)

💡 **Custo estimado para testes:** $1-3/mês

---

## 📁 Passo 3: Configurar no Projeto

### 1. Editar arquivo `.env.local`:

```bash
# Substitua "your-openai-api-key-here" pela sua chave real
OPENAI_API_KEY=sk-proj-sua-chave-aqui-muito-longa
```

### 2. Verificar se arquivo `.env.local` existe:
- ✅ Já criamos o arquivo para você
- 📍 Local: `/home/alex/copybr/.env.local`

### 3. **NUNCA commitar** a chave no Git:
- ✅ `.env.local` já está no `.gitignore`

---

## 🧪 Passo 4: Testar

### Teste 1: Verificar se está funcionando

```bash
# No terminal, dentro da pasta do projeto:
cd /home/alex/copybr
npm run dev
```

### Teste 2: Ver os logs

1. **Abra o projeto:** http://localhost:3000
2. **Vá em:** Dashboard → Novo Projeto
3. **Crie um projeto**
4. **Tente gerar copy**
5. **Veja o console:**
   - 🤖 "Usando modo simulação" = API não configurada
   - 🚀 "Usando OpenAI API real" = Funcionando!

---

## 🎯 Modelos Recomendados

| Modelo | Custo | Qualidade | Recomendação |
|--------|-------|-----------|--------------|
| `gpt-4o-mini` | 💚 Barato | ⭐⭐⭐⭐ | **Começar aqui** |
| `gpt-4o` | 💛 Médio | ⭐⭐⭐⭐⭐ | Produção |
| `gpt-3.5-turbo` | 💚 Muito barato | ⭐⭐⭐ | Testes básicos |

**Configurado para usar:** `gpt-4o-mini` (melhor custo-benefício)

---

## 💰 Custos Estimados

### Por geração de copy (5 variações):
- **gpt-4o-mini:** ~$0.01 
- **gpt-4o:** ~$0.05
- **gpt-3.5-turbo:** ~$0.003

### Por mês (uso normal):
- **Desenvolvimento:** $1-5
- **Produção pequena:** $10-50
- **Produção média:** $50-200

---

## 🔧 Configurações Avançadas

### Trocar modelo (se quiser):

Edite: `src/lib/openai.ts` linha 156:

```javascript
// Atual (mais barato):
model: 'gpt-4o-mini',

// Mais qualidade:
model: 'gpt-4o',

// Mais barato:
model: 'gpt-3.5-turbo',
```

### Ajustar criatividade:

```javascript
temperature: 0.8, // 0-2 (0=conservador, 2=criativo)
```

---

## ❌ Possíveis Erros

### "insufficient_quota"
- **Problema:** Sem créditos
- **Solução:** Adicionar cartão/créditos no billing

### "invalid_api_key"
- **Problema:** Chave errada/expirada  
- **Solução:** Gerar nova chave

### "rate_limit_exceeded"
- **Problema:** Muitas requisições
- **Solução:** Esperar alguns minutos

### "Usando modo simulação"
- **Problema:** Chave não configurada
- **Solução:** Adicionar chave no `.env.local`

---

## 🎉 Pronto para Testar!

Depois de configurar:

1. **Reinicie o servidor:** `Ctrl+C` → `npm run dev`
2. **Crie um projeto**
3. **Gere seu primeiro copy com IA real!**

🚀 **A mágica acontece!**