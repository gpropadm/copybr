'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart3, TrendingUp, Target, Award } from 'lucide-react'
import { getAllABTests, ABTest, calculateABTestStats } from '@/lib/database-ab-testing'

export default function ABTestingPage() {
  const [tests, setTests] = useState<ABTest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTests()
  }, [])

  const loadTests = async () => {
    try {
      const allTests = await getAllABTests()
      setTests(allTests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } catch (error) {
      console.error('Erro ao carregar testes A/B:', error)
    } finally {
      setLoading(false)
    }
  }

  const completedTests = tests.filter(t => t.status === 'completed')
  const runningTests = tests.filter(t => t.status === 'running')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const getScoreAccuracy = () => {
    const testsWithResults = completedTests.filter(t => t.realCTR && t.realCTR > 0)
    if (testsWithResults.length === 0) return { correct: 0, total: 0, accuracy: 0 }

    let correct = 0
    testsWithResults.forEach(test => {
      const aiPrediction = test.aiScore >= 80 ? 'high' : test.aiScore >= 60 ? 'medium' : 'low'
      const realPerformance = (test.realCTR || 0) >= 3 ? 'high' : (test.realCTR || 0) >= 1.5 ? 'medium' : 'low'
      if (aiPrediction === realPerformance) correct++
    })

    return {
      correct,
      total: testsWithResults.length,
      accuracy: (correct / testsWithResults.length) * 100
    }
  }

  const scoreAccuracy = getScoreAccuracy()

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1,2,3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Testes A/B
        </h1>
        <p className="text-gray-600">
          Compare scores da IA com resultados reais
        </p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Testes</p>
                <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-gray-900">{completedTests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                <p className="text-2xl font-bold text-gray-900">{runningTests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Precisão IA</p>
                <p className="text-2xl font-bold text-gray-900">
                  {scoreAccuracy.accuracy.toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Testes */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Testes</CardTitle>
        </CardHeader>
        <CardContent>
          {tests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Nenhum teste A/B criado ainda</p>
              <p className="text-sm mt-2">Vá para um projeto e clique em "Teste A/B" em qualquer copy</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tests.map((test) => {
                const stats = calculateABTestStats(test)
                return (
                  <div key={test.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {test.campaignName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {test.notes || 'Sem observações'}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Score IA:</span>
                            <span className="ml-1 font-medium">{test.aiScore}</span>
                          </div>
                          
                          {test.realCTR && (
                            <div>
                              <span className="text-gray-500">CTR Real:</span>
                              <span className="ml-1 font-medium">{test.realCTR.toFixed(2)}%</span>
                            </div>
                          )}
                          
                          {test.realConversions && (
                            <div>
                              <span className="text-gray-500">Conversões:</span>
                              <span className="ml-1 font-medium">{test.realConversions}</span>
                            </div>
                          )}
                          
                          {stats.conversionRate > 0 && (
                            <div>
                              <span className="text-gray-500">Taxa Conv:</span>
                              <span className="ml-1 font-medium">{stats.conversionRate.toFixed(1)}%</span>
                            </div>
                          )}
                          
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <span className={`ml-1 px-2 py-1 rounded text-xs ${
                              test.status === 'completed' ? 'bg-green-100 text-green-800' :
                              test.status === 'running' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {test.status === 'completed' ? 'Completo' :
                               test.status === 'running' ? 'Rodando' : 'Pausado'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-gray-500">
                        <p>{formatDate(test.createdAt)}</p>
                        <p className="capitalize">{test.platform}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}