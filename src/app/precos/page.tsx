'use client'

import { Check, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

export default function PrecosPage() {
  const plans = [
    {
      title: 'Gratuito',
      price: 0,
      period: 'Para sempre',
      description: 'Perfeito para começar',
      features: [
        '5 gerações por mês',
        '3 templates básicos',
        'Marca d\'água CopyBR',
        'Suporte por email',
        'Acesso à comunidade'
      ],
      buttonText: 'Começar Grátis',
      popular: false
    },
    {
      title: 'Pro',
      price: 47,
      period: 'por mês',
      description: 'Para profissionais de marketing',
      features: [
        '200 gerações por mês',
        'Todos os templates',
        'Sem marca d\'água',
        'Suporte prioritário',
        'Histórico de gerações',
        'Exportação em PDF/Word',
        'Análise de performance'
      ],
      buttonText: 'Assinar Pro',
      popular: true
    },
    {
      title: 'Premium',
      price: 97,
      period: 'por mês',
      description: 'Para agências e equipes',
      features: [
        'Gerações ilimitadas',
        'Templates premium',
        'Acesso antecipado',
        'API access',
        'Suporte VIP 24/7',
        'Multi-usuários (até 5)',
        'Templates customizados',
        'Treinamento personalizado'
      ],
      buttonText: 'Assinar Premium',
      popular: false
    }
  ]

  const faqs = [
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento. Seu acesso continuará até o final do período pago.'
    },
    {
      question: 'O que acontece se eu exceder o limite de gerações?',
      answer: 'No plano gratuito, você precisará aguardar o próximo mês. Nos planos pagos, oferecemos compras avulsas ou upgrade automático.'
    },
    {
      question: 'Vocês oferecem desconto para anuidades?',
      answer: 'Sim! Oferecemos 20% de desconto para pagamentos anuais. Entre em contato para mais detalhes.'
    },
    {
      question: 'Posso usar o CopyBR para clientes?',
      answer: 'Absolutamente! Nossos planos Pro e Premium são ideais para agências e freelancers que atendem clientes.'
    },
    {
      question: 'Há garantia de reembolso?',
      answer: 'Sim, oferecemos garantia de 30 dias para todos os planos pagos. Se não ficar satisfeito, devolvemos 100% do valor.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Preços simples e transparentes
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Comece grátis e escale conforme seu negócio cresce. 
            Sem taxas ocultas, sem compromisso de longo prazo.
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            <span>Garantia de 30 dias ou seu dinheiro de volta</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.title} 
                className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Tire suas dúvidas sobre nossos planos e funcionalidades
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Falar com Vendas
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Começar Teste Grátis
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}