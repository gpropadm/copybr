'use client'

import { useState } from 'react'
import { TestTube, BarChart3, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'
import { createABTest, updateABTestResults, getABTestsByCopyId } from '@/lib/database-ab-testing'

interface ABTestButtonProps {
  copyId: string
  aiScore: number
  copyContent: string
}

export default function ABTestButton({ copyId, aiScore, copyContent }: ABTestButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [testCreated, setTestCreated] = useState(false)

  const handleCreateTest = async () => {
    setLoading(true)
    try {
      await createABTest({
        copyId,
        campaignName: `Teste - ${copyContent.substring(0, 30)}...`,
        platform: 'facebook',
        aiScore,
        status: 'running',
        startDate: new Date().toISOString()
      })
      setTestCreated(true)
      alert('✅ Teste A/B criado! Agora você pode adicionar os resultados reais.')
    } catch (error) {
      console.error('Erro ao criar teste:', error)
      alert('❌ Erro ao criar teste A/B')
    } finally {
      setLoading(false)
    }
  }

  const AddResultsModal = () => {
    const [results, setResults] = useState({
      impressions: '',
      clicks: '',
      conversions: '',
      spend: '',
      notes: ''
    })

    const handleSubmitResults = async () => {
      setLoading(true)
      try {
        // Busca o teste criado para este copy
        const tests = await getABTestsByCopyId(copyId)
        const latestTest = tests[tests.length - 1]

        if (latestTest) {
          const realCTR = results.impressions && results.clicks 
            ? (Number(results.clicks) / Number(results.impressions)) * 100
            : undefined

          await updateABTestResults(latestTest.id, {
            realImpressions: results.impressions ? Number(results.impressions) : undefined,
            realClicks: results.clicks ? Number(results.clicks) : undefined,
            realConversions: results.conversions ? Number(results.conversions) : undefined,
            realSpend: results.spend ? Number(results.spend) : undefined,
            realCTR,
            status: 'completed',
            endDate: new Date().toISOString(),
            notes: results.notes
          })

          alert(`✅ Resultados salvos!\n\nScore IA: ${aiScore}\nCTR Real: ${realCTR?.toFixed(2)}%\nConversões: ${results.conversions}`)
          setShowModal(false)
        }
      } catch (error) {
        console.error('Erro ao salvar resultados:', error)
        alert('❌ Erro ao salvar resultados')
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Adicionar Resultados Reais
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Impressões</label>
              <input
                type="number"
                value={results.impressions}
                onChange={(e) => setResults({...results, impressions: e.target.value})}
                placeholder="Ex: 10000"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cliques</label>
              <input
                type="number"
                value={results.clicks}
                onChange={(e) => setResults({...results, clicks: e.target.value})}
                placeholder="Ex: 250"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Conversões</label>
              <input
                type="number"
                value={results.conversions}
                onChange={(e) => setResults({...results, conversions: e.target.value})}
                placeholder="Ex: 15"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gasto (R$)</label>
              <input
                type="number"
                step="0.01"
                value={results.spend}
                onChange={(e) => setResults({...results, spend: e.target.value})}
                placeholder="Ex: 100.50"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Observações</label>
              <textarea
                value={results.notes}
                onChange={(e) => setResults({...results, notes: e.target.value})}
                placeholder="Observações sobre o teste..."
                className="w-full p-2 border rounded-md h-20"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button 
              onClick={handleSubmitResults}
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Salvando...' : 'Salvar Resultados'}
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!testCreated) {
    return (
      <Button
        onClick={handleCreateTest}
        disabled={loading}
        size="sm"
        variant="outline"
        className="text-xs"
      >
        <TestTube className="h-3 w-3 mr-1" />
        {loading ? 'Criando...' : 'Teste A/B'}
      </Button>
    )
  }

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        size="sm"
        variant="outline"
        className="text-xs bg-green-50 border-green-300 text-green-700"
      >
        <TrendingUp className="h-3 w-3 mr-1" />
        Add Resultados
      </Button>

      {showModal && <AddResultsModal />}
    </>
  )
}