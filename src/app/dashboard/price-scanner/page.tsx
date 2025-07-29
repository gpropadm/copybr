'use client'

import PriceScanner from '@/components/price-scanner/PriceScanner'

export default function PriceScannerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            📱 Scanner de Preços
          </h1>
          <p className="text-gray-600">
            Escaneie produtos no atacado e monitore preços automaticamente
          </p>
        </div>
        
        <PriceScanner />
      </div>
    </div>
  )
}