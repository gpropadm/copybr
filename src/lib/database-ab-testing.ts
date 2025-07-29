// A/B Testing database functions - NOVA funcionalidade
// Não mexe em nada existente

import { openDB } from 'idb'

export interface ABTest {
  id: string
  copyId: string
  campaignName: string
  platform: string
  aiScore: number
  realCTR?: number
  realConversions?: number
  realSpend?: number
  realImpressions?: number
  realClicks?: number
  status: 'running' | 'completed' | 'paused'
  startDate: string
  endDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ABTestComparison {
  copyA: ABTest
  copyB: ABTest
  winner?: 'A' | 'B' | 'tie'
  confidenceLevel?: number
}

const AB_TESTING_DB_NAME = 'copybr_ab_testing'
const AB_TESTING_VERSION = 1

async function getABTestingDB() {
  return openDB(AB_TESTING_DB_NAME, AB_TESTING_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('ab_tests')) {
        const store = db.createObjectStore('ab_tests', {
          keyPath: 'id'
        })
        store.createIndex('copyId', 'copyId')
        store.createIndex('status', 'status')
        store.createIndex('platform', 'platform')
        store.createIndex('createdAt', 'createdAt')
      }

      if (!db.objectStoreNames.contains('ab_comparisons')) {
        const compStore = db.createObjectStore('ab_comparisons', {
          keyPath: 'id'
        })
        compStore.createIndex('createdAt', 'createdAt')
      }
    }
  })
}

// Criar novo teste A/B
export async function createABTest(test: Omit<ABTest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const db = await getABTestingDB()
  const id = `ab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const fullTest: ABTest = {
    ...test,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  await db.add('ab_tests', fullTest)
  return id
}

// Atualizar teste com resultados reais
export async function updateABTestResults(
  testId: string, 
  results: Partial<Pick<ABTest, 'realCTR' | 'realConversions' | 'realSpend' | 'realImpressions' | 'realClicks' | 'status' | 'endDate' | 'notes'>>
): Promise<void> {
  const db = await getABTestingDB()
  const test = await db.get('ab_tests', testId)
  
  if (!test) {
    throw new Error('Teste A/B não encontrado')
  }

  const updatedTest: ABTest = {
    ...test,
    ...results,
    updatedAt: new Date().toISOString()
  }

  await db.put('ab_tests', updatedTest)
}

// Buscar testes por copy ID
export async function getABTestsByCopyId(copyId: string): Promise<ABTest[]> {
  const db = await getABTestingDB()
  return db.getAllFromIndex('ab_tests', 'copyId', copyId)
}

// Buscar todos os testes
export async function getAllABTests(): Promise<ABTest[]> {
  const db = await getABTestingDB()
  return db.getAll('ab_tests')
}

// Buscar teste por ID
export async function getABTestById(testId: string): Promise<ABTest | undefined> {
  const db = await getABTestingDB()
  return db.get('ab_tests', testId)
}

// Deletar teste
export async function deleteABTest(testId: string): Promise<void> {
  const db = await getABTestingDB()
  await db.delete('ab_tests', testId)
}

// Criar comparação A/B
export async function createABComparison(comparison: Omit<ABTestComparison, 'id'>): Promise<string> {
  const db = await getABTestingDB()
  const id = `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const fullComparison = {
    ...comparison,
    id,
    createdAt: new Date().toISOString()
  }

  await db.add('ab_comparisons', fullComparison)
  return id
}

// Calcular estatísticas de performance
export function calculateABTestStats(test: ABTest) {
  const stats = {
    ctr: 0,
    conversionRate: 0,
    cpc: 0,
    cpa: 0,
    roas: 0
  }

  if (test.realImpressions && test.realClicks) {
    stats.ctr = (test.realClicks / test.realImpressions) * 100
  }

  if (test.realClicks && test.realConversions) {
    stats.conversionRate = (test.realConversions / test.realClicks) * 100
  }

  if (test.realSpend && test.realClicks) {
    stats.cpc = test.realSpend / test.realClicks
  }

  if (test.realSpend && test.realConversions) {
    stats.cpa = test.realSpend / test.realConversions
  }

  return stats
}

// Comparar performance de dois testes
export function compareABTests(testA: ABTest, testB: ABTest) {
  const statsA = calculateABTestStats(testA)
  const statsB = calculateABTestStats(testB)

  return {
    ctr: {
      winner: statsA.ctr > statsB.ctr ? 'A' : statsB.ctr > statsA.ctr ? 'B' : 'tie',
      difference: Math.abs(statsA.ctr - statsB.ctr)
    },
    conversionRate: {
      winner: statsA.conversionRate > statsB.conversionRate ? 'A' : statsB.conversionRate > statsA.conversionRate ? 'B' : 'tie',
      difference: Math.abs(statsA.conversionRate - statsB.conversionRate)
    },
    aiScore: {
      winner: testA.aiScore > testB.aiScore ? 'A' : testB.aiScore > testA.aiScore ? 'B' : 'tie',
      difference: Math.abs(testA.aiScore - testB.aiScore)
    }
  }
}