'use client'

import Link from 'next/link'
import { Zap, Users, Target, Sparkles, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import PricingCard from '@/components/pricing/PricingCard'

export default function HomePage() {
  const plans = [
    {
      title: 'Gratuito',
      price: 0,
      description: 'Perfeito para começar',
      features: [
        '5 gerações por mês',
        '3 templates básicos',
        'Marca d\'água CopyBR',
        'Suporte por email'
      ],
      buttonText: 'Começar Grátis',
      onSelect: () => console.log('Free plan selected')
    },
    {
      title: 'Pro',
      price: 47,
      description: 'Para profissionais de marketing',
      features: [
        '200 gerações por mês',
        'Todos os templates',
        'Sem marca d\'água',
        'Suporte prioritário',
        'Histórico de gerações'
      ],
      popular: true,
      buttonText: 'Assinar Pro',
      onSelect: () => console.log('Pro plan selected')
    },
    {
      title: 'Premium',
      price: 97,
      description: 'Para agências e equipes',
      features: [
        'Gerações ilimitadas',
        'Templates premium',
        'Acesso antecipado',
        'API access',
        'Suporte VIP'
      ],
      buttonText: 'Assinar Premium',
      onSelect: () => console.log('Premium plan selected')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>IA 100% em Português Brasileiro</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Crie <span className="text-blue-600">copies que vendem</span><br />
            em segundos com IA
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A primeira plataforma brasileira de geração de copy com IA. 
            Criada especialmente para o mercado nacional com linguagem e cultura 100% brasileira.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/gerar">
              <Button size="lg" className="flex items-center gap-2">
                Começar Grátis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg">
                Ver Demo
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">+1000</div>
                  <div className="text-gray-600">Copies Gerados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600">Templates</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-gray-600">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o CopyBR?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A única plataforma de IA para copy pensada especificamente para o mercado brasileiro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  IA Brasileira
                </h3>
                <p className="text-gray-600">
                  Treinada com linguagem, gírias e cultura brasileira. 
                  Entende o seu público como ninguém.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Templates Locais
                </h3>
                <p className="text-gray-600">
                  Black Friday, Dia das Mães, Festa Junina... 
                  Templates para todas as datas brasileiras.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Suporte Nacional
                </h3>
                <p className="text-gray-600">
                  Atendimento em português, no horário brasileiro. 
                  Entendemos suas necessidades.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preços que cabem no seu bolso
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para seu negócio. Sem taxa de setup, cancele quando quiser.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <PricingCard key={plan.title} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para revolucionar seu marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a centenas de empreendedores que já transformaram seus negócios com o CopyBR
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Começar Grátis Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
