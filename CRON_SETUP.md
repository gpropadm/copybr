# 🔄 Configuração do Reset Mensal Automático

## 📋 O que faz:
- Reseta uso mensal de todos os usuários quando o período expira
- Estende período de planos gratuitos por mais 30 dias
- Planos pagos são renovados automaticamente pelo Stripe

## 🛠️ Opções de configuração:

### **Opção 1: Vercel Cron (Recomendado)** ⭐

Criar arquivo `vercel.json` na raiz do projeto:

```json
{
  "crons": [
    {
      "path": "/api/cron/reset-monthly-usage",
      "schedule": "0 0 * * *"
    }
  ]
}
```

**Schedule:** Todo dia às 00:00 UTC

### **Opção 2: GitHub Actions**

Criar `.github/workflows/cron-reset.yml`:

```yaml
name: Reset Monthly Usage
on:
  schedule:
    - cron: '0 0 * * *'  # Todo dia às 00:00 UTC

jobs:
  reset:
    runs-on: ubuntu-latest
    steps:
      - name: Call Reset API
        run: |
          curl -X POST https://copybr.vercel.app/api/cron/reset-monthly-usage \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET_TOKEN }}"
```

### **Opção 3: Cron Job External**

Usar serviços como:
- **cron-job.org** (gratuito)
- **EasyCron**
- **Servidor próprio**

**URL:** `https://copybr.vercel.app/api/cron/reset-monthly-usage`
**Método:** GET ou POST
**Frequência:** Diário

## 🔐 Segurança (Opcional):

Adicionar no Vercel Environment Variables:
```
CRON_SECRET_TOKEN=seu-token-secreto-aqui
```

## ✅ Como funciona:

1. **Reset automático** na primeira geração após expirar
2. **Backup com cron** para garantir que rode mesmo sem uso
3. **Planos pagos** renovados pelo Stripe (não precisa cron)
4. **Planos gratuitos** renovados pelo sistema interno

## 🧪 Teste manual:

```bash
curl https://copybr.vercel.app/api/cron/reset-monthly-usage
```

Resposta esperada:
```json
{
  "success": true,
  "message": "Reset executado para X usuários",
  "resetCount": 0,
  "executedAt": "2025-01-30T..."
}
```