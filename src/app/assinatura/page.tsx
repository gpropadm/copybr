'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Star, ArrowRight, Shield, CreditCard, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import { PLANS, type PlanType } from '@/lib/stripe'

export default function AssinaturaPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('pro')
  const [isAnnual, setIsAnnual] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const plans = [
    {
      id: 'free' as PlanType,
      title: 'Gratuito',
      price: 0,
      originalPrice: 0,
      period: 'Para sempre',
      description: 'Perfeito para começar',
      features: [
        '5 gerações por mês',
        '3 templates básicos',
        'Marca d\'água CopyBR',
        'Suporte por email',
        'Acesso à comunidade'
      ],
      buttonText: 'Plano Atual',
      popular: false,
      disabled: true
    },
    {
      id: 'pro' as PlanType,
      title: 'Pro',
      price: isAnnual ? 37 : 47,
      originalPrice: 47,
      period: isAnnual ? 'por mês (anual)' : 'por mês',
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
      popular: true,
      disabled: false
    },
    {
      id: 'premium' as PlanType,
      title: 'Premium',
      price: isAnnual ? 77 : 97,
      originalPrice: 97,
      period: isAnnual ? 'por mês (anual)' : 'por mês',
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
      popular: false,
      disabled: false
    }
  ]

  const handlePlanSelect = (planId: PlanType) => {
    setSelectedPlan(planId)
  }

  const handleSubscribe = async () => {
    if (selectedPlan === 'free') return

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: selectedPlan,
          isAnnual,
        }),
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      } else {
        console.error('Erro ao criar checkout')
      }
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      title: 'Resultados instantâneos',
      description: 'Crie copies que convertem em segundos'
    },
    {
      icon: <Shield className="h-6 w-6 text-green-500" />,
      title: '100% seguro',
      description: 'Seus dados protegidos com criptografia de ponta'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-purple-500" />,
      title: 'Cancele quando quiser',
      description: 'Sem multas ou compromissos de longo prazo'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Escolha seu plano
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Desbloqueie todo o potencial da IA brasileira para copy. 
            Comece com 7 dias grátis em qualquer plano pago.
          </p>
          
          {/* Annual/Monthly Toggle */}
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                !isAnnual 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isAnnual 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Anual
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative cursor-pointer transition-all ${
                  plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''
                } ${
                  selectedPlan === plan.id && !plan.disabled ? 'ring-2 ring-blue-500' : ''
                } ${
                  plan.disabled ? 'opacity-60' : ''
                }`}
                onClick={() => !plan.disabled && handlePlanSelect(plan.id)}
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
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatCurrency(plan.price)}
                      </span>
                      {isAnnual && plan.price !== plan.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatCurrency(plan.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-600">{plan.period}</span>
                    {isAnnual && plan.id !== 'free' && (
                      <p className="text-sm text-green-600 mt-1">
                        Economia de {formatCurrency((plan.originalPrice - plan.price) * 12)} por ano
                      </p>
                    )}
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
                  
                  {selectedPlan === plan.id && !plan.disabled && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800 text-sm font-medium">
                        Plano selecionado
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Plan Summary */}
          {selectedPlan !== 'free' && (
            <div className="mt-12 max-w-2xl mx-auto">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Plano {plans.find(p => p.id === selectedPlan)?.title}
                      </h3>
                      <p className="text-gray-600">
                        {formatCurrency(plans.find(p => p.id === selectedPlan)?.price || 0)} {
                          isAnnual ? 'por mês (cobrado anualmente)' : 'por mês'
                        }
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {isAnnual 
                          ? formatCurrency((plans.find(p => p.id === selectedPlan)?.price || 0) * 12)
                          : formatCurrency(plans.find(p => p.id === selectedPlan)?.price || 0)
                        }
                      </p>
                      <p className="text-sm text-gray-600">
                        {isAnnual ? 'por ano' : 'por mês'}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleSubscribe}
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Processando...'
                    ) : (
                      <>
                        Começar com 7 dias grátis
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Cancele a qualquer momento. Sem compromisso.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o CopyBR?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Como funciona o teste grátis de 7 dias?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Você tem acesso completo ao plano escolhido por 7 dias. Só será cobrado após o período de teste. 
                  Pode cancelar a qualquer momento sem custo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Posso mudar de plano depois?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  As mudanças são aplicadas imediatamente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Qual a diferença entre pagamento mensal e anual?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  O pagamento anual oferece 20% de desconto. Você paga 10 meses e ganha 2 meses grátis. 
                  Ainda assim, pode cancelar quando quiser.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para turbinar suas copies?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de profissionais que já transformaram seus resultados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => router.push('/registro')}
            >
              Criar Conta Grátis
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => router.push('/precos')}
            >
              Ver Todos os Planos
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}