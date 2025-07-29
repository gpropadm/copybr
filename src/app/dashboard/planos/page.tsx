'use client'

import { useState } from 'react'
import { Check, Zap, Crown, Building, Star, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface Plan {
  id: string
  name: string
  price: number
  period: string
  description: string
  icon: any
  color: string
  popular?: boolean
  features: string[]
  limits: {
    copies: string
    prompts: string
    history: string
    support: string
  }
}

export default function PlanosPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'FREE',
      price: 0,
      period: 'Para sempre',
      description: 'Ideal para testar e conhecer a plataforma',
      icon: Star,
      color: 'text-gray-600',
      features: [
        'Imagem para prompt básico',
        'Copies em 5 estilos diferentes',
        'Histórico de 30 dias',
        'Suporte por email'
      ],
      limits: {
        copies: '10 copies por mês',
        prompts: '2 prompts por mês',
        history: '30 dias',
        support: 'Email'
      }
    },
    {
      id: 'starter',
      name: 'STARTER',
      price: billingCycle === 'monthly' ? 19 : 190,
      period: billingCycle === 'monthly' ? '/mês' : '/ano',
      description: 'Perfeito para freelancers e pequenos negócios',
      icon: Zap,
      color: 'text-blue-600',
      popular: true,
      features: [
        'Tudo do plano FREE',
        'Análises ilimitadas de imagens',
        'Histórico completo ilimitado',
        'Favoritos e organização',
        'Suporte prioritário',
        'Sem watermark'
      ],
      limits: {
        copies: '100 copies por mês',
        prompts: '20 prompts por mês',
        history: 'Ilimitado',
        support: 'Email prioritário'
      }
    },
    {
      id: 'pro',
      name: 'PRO',
      price: billingCycle === 'monthly' ? 49 : 490,
      period: billingCycle === 'monthly' ? '/mês' : '/ano',
      description: 'Para agências e profissionais de marketing',
      icon: Crown,
      color: 'text-purple-600',
      features: [
        'Tudo do plano STARTER',
        'Análises avançadas com IA',
        'Templates personalizados',
        'Integração com redes sociais',
        'Relatórios detalhados',
        'Chat suporte dedicado'
      ],
      limits: {
        copies: '500 copies por mês',
        prompts: '100 prompts por mês',
        history: 'Ilimitado',
        support: 'Chat + Email'
      }
    },
    {
      id: 'business',
      name: 'BUSINESS',
      price: billingCycle === 'monthly' ? 149 : 1490,
      period: billingCycle === 'monthly' ? '/mês' : '/ano',
      description: 'Solução completa para empresas',
      icon: Building,
      color: 'text-orange-600',
      features: [
        'Tudo do plano PRO',
        'Uso ilimitado de todas as funcionalidades',
        'API para integração',
        'White-label disponível',
        'Gerente de conta dedicado',
        'SLA garantido',
        'Treinamento da equipe'
      ],
      limits: {
        copies: 'Ilimitado',
        prompts: 'Ilimitado',
        history: 'Ilimitado',
        support: 'Gerente dedicado'
      }
    }
  ]

  const getDiscountPercentage = () => {
    return billingCycle === 'yearly' ? 17 : 0 // ~2 meses grátis
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Escolha o Plano Ideal
          </h1>
          <p className="text-base text-gray-600 mb-4">
            Transforme suas ideias em copies poderosas com IA
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Anual
              {getDiscountPercentage() > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  -{getDiscountPercentage()}%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              } hover:shadow-lg transition-all duration-200`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Mais Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${
                  plan.popular ? 'bg-blue-100' : 'bg-gray-100'
                } mb-4 mx-auto`}>
                  <plan.icon className={`h-6 w-6 ${plan.color}`} />
                </div>
                
                <CardTitle className="text-lg font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                
                <div className="mt-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price === 0 ? 'Grátis' : `R$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-600 ml-1 text-sm">{plan.period}</span>
                  )}
                </div>
                
                <p className="text-xs text-gray-600 mt-1">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Limits */}
                <div className="space-y-2 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Copies:</span>
                    <span className="font-medium">{plan.limits.copies}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prompts:</span>
                    <span className="font-medium">{plan.limits.prompts}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Histórico:</span>
                    <span className="font-medium">{plan.limits.history}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Suporte:</span>
                    <span className="font-medium">{plan.limits.support}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full mt-6 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {plan.id === 'free' ? 'Começar Grátis' : 'Assinar Agora'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 text-center mb-4">
            Perguntas Frequentes
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="border-b border-gray-200 pb-2">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Posso cancelar a qualquer momento?</h4>
              <p className="text-xs text-gray-600">Sim! Sem multas ou taxas de cancelamento.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-2">
              <h4 className="text-sm font-medium text-gray-900 mb-1">E se eu exceder meu limite?</h4>
              <p className="text-xs text-gray-600">Receberá notificação para upgrade. Planos pagos têm buffer de segurança.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-2">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Posso alterar meu plano?</h4>
              <p className="text-xs text-gray-600">Sim! Upgrade/downgrade a qualquer momento com efeito imediato.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Há garantia de reembolso?</h4>
              <p className="text-xs text-gray-600">Garantia de 7 dias para planos pagos. 100% do valor devolvido.</p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Pronto para Revolucionar suas Copies?
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Junte-se a milhares de profissionais que já usam o CopyBR para criar conteúdo incrível
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Começar Agora Grátis
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}