'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Zap, Bot, Target, Wrench, PenTool, Users, BarChart3, Megaphone, ShoppingCart, FileText, Briefcase, Globe, LogOut, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Verificar se usuário está logado
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  const plataformaItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      description: 'Painel principal com visão geral e estatísticas',
      icon: <BarChart3 className="h-5 w-5 text-[#693ee0]" />
    },
    {
      title: 'Editor de Copy',
      href: '/gerar',
      description: 'Crie textos persuasivos com IA brasileira',
      icon: <PenTool className="h-5 w-5 text-green-600" />
    },
    {
      title: 'Templates',
      href: '/templates',
      description: 'Modelos prontos para cada ocasião',
      icon: <FileText className="h-5 w-5 text-purple-600" />
    },
    {
      title: 'Histórico',
      href: '/historico',
      description: 'Todos os seus copies salvos e organizados',
      icon: <Bot className="h-5 w-5 text-orange-600" />
    }
  ]

  const casosUsoItems = [
    {
      title: 'Marketing Digital',
      href: '/casos-uso/marketing-digital',
      description: 'Anúncios Facebook, Google Ads, email marketing',
      icon: <Megaphone className="h-5 w-5 text-red-600" />
    },
    {
      title: 'E-commerce',
      href: '/casos-uso/ecommerce',
      description: 'Descrições de produto, páginas de venda',
      icon: <ShoppingCart className="h-5 w-5 text-[#693ee0]" />
    },
    {
      title: 'Redes Sociais',
      href: '/casos-uso/redes-sociais',
      description: 'Posts Instagram, LinkedIn, TikTok',
      icon: <Users className="h-5 w-5 text-pink-600" />
    },
    {
      title: 'Conteúdo',
      href: '/casos-uso/conteudo',
      description: 'Blogs, newsletters, roteiros YouTube',
      icon: <FileText className="h-5 w-5 text-green-600" />
    },
    {
      title: 'Vendas',
      href: '/casos-uso/vendas',
      description: 'Scripts de vendas, pitches, propostas',
      icon: <Target className="h-5 w-5 text-orange-600" />
    },
    {
      title: 'Empresarial',
      href: '/casos-uso/empresarial',
      description: 'Comunicação interna, relatórios, apresentações',
      icon: <Briefcase className="h-5 w-5 text-gray-600" />
    }
  ]

  const recursosItems = [
    {
      title: 'IA Brasileira',
      href: '/recursos/ia-brasileira',
      description: 'Tecnologia adaptada para o português brasileiro',
      icon: <Globe className="h-5 w-5 text-green-600" />
    },
    {
      title: 'Templates Premium',
      href: '/recursos/templates',
      description: 'Modelos exclusivos para cada nicho',
      icon: <FileText className="h-5 w-5 text-purple-600" />
    },
    {
      title: 'API Integration',
      href: '/recursos/api',
      description: 'Integre o CopyBR em suas ferramentas',
      icon: <Wrench className="h-5 w-5 text-blue-600" />
    },
    {
      title: 'Analytics',
      href: '/recursos/analytics',
      description: 'Métricas e performance dos seus copies',
      icon: <BarChart3 className="h-5 w-5 text-orange-600" />
    },
    {
      title: 'Suporte VIP',
      href: '/recursos/suporte',
      description: 'Atendimento personalizado e prioritário',
      icon: <Users className="h-5 w-5 text-red-600" />
    }
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CopyBR</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {!user && (
              <>
                <Dropdown title="Plataforma" items={plataformaItems} />
                <Dropdown title="Casos de Uso" items={casosUsoItems} />
                <Dropdown title="Recursos" items={recursosItems} />
                <Link href="/precos" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Preços
                </Link>
              </>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Olá, {user.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button size="sm">
                    Começar Grátis
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t max-h-96 overflow-y-auto">
            {!user && (
              <>
                {/* Plataforma Mobile */}
                <div className="px-3 py-2">
                  <div className="font-medium text-gray-900 mb-2">Plataforma</div>
                  {plataformaItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Casos de Uso Mobile */}
                <div className="px-3 py-2">
                  <div className="font-medium text-gray-900 mb-2">Casos de Uso</div>
                  {casosUsoItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                {/* Recursos Mobile */}
                <div className="px-3 py-2">
                  <div className="font-medium text-gray-900 mb-2">Recursos</div>
                  {recursosItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/precos"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  Preços
                </Link>
              </>
            )}
            
            <div className="flex flex-col space-y-2 px-3 py-2">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Olá, {user.name}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full" 
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/registro" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full">
                      Começar Grátis
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}