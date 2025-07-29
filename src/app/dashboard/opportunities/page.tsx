'use client'

import OpportunityDashboard from '@/components/price-scanner/OpportunityDashboard'

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-6 max-w-6xl">
        <OpportunityDashboard />
      </div>
    </div>
  )
}