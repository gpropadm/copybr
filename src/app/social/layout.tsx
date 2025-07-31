'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Activity,
  Users,
  Brain,
  Bot,
  BarChart3,
  Calendar,
  Settings,
  ChevronLeft,
  Menu,
  X,
  DollarSign,
  Palette,
  Link as LinkIcon,
  Crown
} from 'lucide-react'

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const navigationItems = [
    {
      href: '/social',
      label: 'Dashboard',
      icon: Activity,
      exact: true
    },
    {
      href: '/social/clientes',
      label: 'Clientes',
      icon: Users
    },
    {
      href: '/social/analytics',
      label: 'Analytics & IA',
      icon: Brain
    },
    {
      href: '/social/automacoes',
      label: 'Automações',
      icon: Bot
    },
    {
      href: '/social/campanhas',
      label: 'Campanhas',
      icon: Calendar
    },
    {
      href: '/social/roi',
      label: 'ROI & Attribution',
      icon: DollarSign
    },
    {
      href: '/social/criacao',
      label: 'Criação de Conteúdo',
      icon: Palette
    },
    {
      href: '/social/integracoes',
      label: 'Integrações',
      icon: LinkIcon
    },
    {
      href: '/social/premium',
      label: 'Premium',
      icon: Crown
    },
    {
      href: '/social/relatorios',
      label: 'Relatórios',
      icon: BarChart3
    },
    {
      href: '/social/configuracoes',
      label: 'Configurações',
      icon: Settings
    }
  ]

  const isActiveRoute = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Mobile menu overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-50 ${showMobileMenu ? '' : 'hidden'}`} onClick={() => setShowMobileMenu(false)} />
      
      {/* Desktop layout wrapper */}
      <div className="hidden lg:flex min-h-screen">
        {/* Sidebar - APENAS DESKTOP */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm">Voltar ao CopyBR</span>
              </Link>
            </div>
            <div className="mt-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#693ee0]" />
                SocialBR
              </h2>
              <p className="text-sm text-gray-600">Social Media Management</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.href, item.exact)
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#693ee0] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="text-xs text-gray-500">
              SocialBR v1.0
            </div>
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Overlay apenas */}
      <div className={`lg:hidden ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out`}>
        {/* Mobile close button and header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#693ee0]" />
              SocialBR
            </h2>
          </div>
          <button
            onClick={() => setShowMobileMenu(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Back to CopyBR */}
        <div className="px-4 py-2 border-b border-gray-200">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            onClick={() => setShowMobileMenu(false)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Voltar ao CopyBR</span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = isActiveRoute(item.href, item.exact)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#693ee0] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile Main Content */}
      <div className="lg:hidden min-h-screen">
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <button
            onClick={() => setShowMobileMenu(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#693ee0]" />
            SocialBR
          </h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}