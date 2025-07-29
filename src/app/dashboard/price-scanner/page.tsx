'use client'

import PriceScanner from '@/components/price-scanner/PriceScanner'

export default function PriceScannerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            📱 Scanner de Preços
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Escaneie produtos no atacado e monitore preços automaticamente
          </p>
        </div>
        
        <PriceScanner />
      </div>
    </div>
  )
}