'use client'

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Calendar, Zap, Crown, Building, Star, ArrowUp } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface UsageData {
  copiesUsed: number
  promptsUsed: number
  projectsCreated: number
  copiesLimit: number
  promptsLimit: number
  projectsLimit: number
  planName: string
  planIcon: any
  resetDate: string
  dailyUsage: { date: string, copies: number, prompts: number }[]
}

export default function MeuConsumoPage() {
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [currentPlan, setCurrentPlan] = useState('free')

  useEffect(() => {
    // Buscar dados reais da API
    const fetchUserData = async () => {
      try {
        // Obter dados do usuário logado
        const userData = localStorage.getItem('auth_user')
        let headers = {}
        
        if (userData) {
          const user = JSON.parse(userData)
          headers = { 'x-user-id': user.id }
        }
        
        const response = await fetch('/api/user/subscription', { headers });
        const data = await response.json();
        
        // Buscar projetos criados
        let projectsCount = 0;
        try {
          const projectsResponse = await fetch('/api/projects', { headers });
          if (projectsResponse.ok) {
            const projectsData = await projectsResponse.json();
            projectsCount = projectsData.data?.length || 0;
          }
        } catch (error) {
          console.log('Erro ao buscar projetos:', error);
        }
        
        if (response.ok) {
          const realData: UsageData = {
            copiesUsed: data.monthlyUsage || 0,
            promptsUsed: 0, // Por enquanto não temos prompts separados
            projectsCreated: projectsCount,
            copiesLimit: data.limits[data.planType] === -1 ? 999999 : data.limits[data.planType],
            promptsLimit: data.planType === 'free' ? 2 : data.planType === 'starter' ? 20 : data.planType === 'pro' ? 100 : 999999,
            projectsLimit: data.planType === 'free' ? 10 : data.planType === 'starter' ? 50 : data.planType === 'pro' ? 200 : 999999,
            planName: data.planType.toUpperCase(),
            planIcon: data.planType === 'free' ? Star : data.planType === 'starter' ? Zap : data.planType === 'pro' ? Crown : Building,
            resetDate: data.currentPeriodEnd ? 
              new Date(data.currentPeriodEnd).toLocaleDateString('pt-BR') :
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
            dailyUsage: [] // Histórico vazio para usuário novo
          };
          
          setUsageData(realData);
          setCurrentPlan(data.planType);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        // Fallback para usuário novo
        const fallbackData: UsageData = {
          copiesUsed: 0,
          promptsUsed: 0,
          projectsCreated: 0,
          copiesLimit: 10,
          promptsLimit: 2,
          projectsLimit: 10,
          planName: 'FREE',
          planIcon: Star,
          resetDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('pt-BR'),
          dailyUsage: []
        };
        setUsageData(fallbackData);
      }
    };
    
    fetchUserData();
  }, [])

  if (!usageData) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  }

  const copiesPercentage = Math.round((usageData.copiesUsed / usageData.copiesLimit) * 100)
  const promptsPercentage = Math.round((usageData.promptsUsed / usageData.promptsLimit) * 100)
  const projectsPercentage = Math.round((usageData.projectsCreated / usageData.projectsLimit) * 100)
  
  const resetDate = new Date(usageData.resetDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  const isNearLimit = copiesPercentage > 80 || promptsPercentage > 80 || projectsPercentage > 80
  const isOverLimit = copiesPercentage >= 100 || promptsPercentage >= 100 || projectsPercentage >= 100

  const totalUsageThisMonth = usageData.dailyUsage.reduce((acc, day) => acc + day.copies + day.prompts, 0)

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-blue-600" />
            Meu Consumo
          </h1>
          <p className="text-gray-600">
            Acompanhe seu uso mensal e otimize seu plano
          </p>
        </div>

        {/* Alert se próximo do limite */}
        {isNearLimit && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 ${
            isOverLimit 
              ? 'bg-red-50 border-red-400 text-red-800' 
              : 'bg-yellow-50 border-yellow-400 text-yellow-800'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  {isOverLimit ? '🚨 Limite atingido!' : '⚠️ Próximo do limite'}
                </h3>
                <p className="text-sm mt-1">
                  {isOverLimit 
                    ? 'Você atingiu o limite do seu plano. Faça upgrade para continuar usando.'
                    : 'Você está próximo do limite mensal. Considere fazer upgrade.'
                  }
                </p>
              </div>
              <Button size="sm" className={isOverLimit ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700'}>
                <ArrowUp className="h-4 w-4 mr-1" />
                Fazer Upgrade
              </Button>
            </div>
          </div>
        )}

        {/* Current Plan */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              <span className="flex items-center gap-2">
                <usageData.planIcon className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Plano Atual:</span>
                <span className="text-base font-semibold text-gray-900">{usageData.planName}</span>
              </span>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs px-3 py-1"
                onClick={() => window.location.href = '/dashboard/planos'}
              >
                Alterar Plano
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-900 mb-1">{usageData.planName}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Plano Ativo</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-lg font-semibold text-blue-600 mb-1">{totalUsageThisMonth}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Total Usado</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-lg font-semibold text-green-600 mb-1">{resetDate}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Próximo Reset</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Copies Usage */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Copies Utilizadas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    {usageData.copiesUsed}
                  </span>
                  <span className="text-sm text-gray-500">
                    / {usageData.copiesLimit === 999999 ? '∞' : usageData.copiesLimit}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      copiesPercentage >= 100 ? 'bg-red-500' :
                      copiesPercentage >= 80 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(copiesPercentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{copiesPercentage}% usado</span>
                  <span>
                    {usageData.copiesLimit === 999999 
                      ? 'Ilimitado' 
                      : `${usageData.copiesLimit - usageData.copiesUsed} restantes`
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Usage */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Projetos Criados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    {usageData.projectsCreated}
                  </span>
                  <span className="text-sm text-gray-500">
                    / {usageData.projectsLimit === 999999 ? '∞' : usageData.projectsLimit}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      projectsPercentage >= 100 ? 'bg-red-500' :
                      projectsPercentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(projectsPercentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{projectsPercentage}% usado</span>
                  <span>
                    {usageData.projectsLimit === 999999 
                      ? 'Ilimitado' 
                      : `${usageData.projectsLimit - usageData.projectsCreated} restantes`
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompts Usage */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Prompts Utilizados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold text-gray-900">
                    {usageData.promptsUsed}
                  </span>
                  <span className="text-sm text-gray-500">
                    / {usageData.promptsLimit === 999999 ? '∞' : usageData.promptsLimit}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      promptsPercentage >= 100 ? 'bg-red-500' :
                      promptsPercentage >= 80 ? 'bg-yellow-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${Math.min(promptsPercentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{promptsPercentage}% usado</span>
                  <span>
                    {usageData.promptsLimit === 999999 
                      ? 'Ilimitado' 
                      : `${usageData.promptsLimit - usageData.promptsUsed} restantes`
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage History */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Histórico dos Últimos 7 Dias</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageData.dailyUsage.slice(-7).map((day, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(day.date).toLocaleDateString('pt-BR', { 
                        weekday: 'short', 
                        day: '2-digit', 
                        month: '2-digit' 
                      })}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>{day.copies} copies</span>
                    <span>{day.prompts} prompts</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Compare Planos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <Star className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">FREE</h3>
                <p className="text-sm text-gray-600">10 copies/mês</p>
                <p className="text-sm text-gray-600">2 prompts/mês</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">STARTER</h3>
                <p className="text-sm text-gray-600">100 copies/mês</p>
                <p className="text-sm text-gray-600">20 prompts/mês</p>
                <p className="text-sm font-medium text-blue-600">R$ 19/mês</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">PRO</h3>
                <p className="text-sm text-gray-600">500 copies/mês</p>
                <p className="text-sm text-gray-600">100 prompts/mês</p>
                <p className="text-sm font-medium text-purple-600">R$ 49/mês</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <Building className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900">BUSINESS</h3>
                <p className="text-sm text-gray-600">Uso ilimitado</p>
                <p className="text-sm text-gray-600">API access</p>
                <p className="text-sm font-medium text-orange-600">R$ 149/mês</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button onClick={() => window.location.href = '/dashboard/planos'}>
                Ver Todos os Planos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}