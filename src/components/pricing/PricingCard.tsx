'use client'

import { Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

interface PricingCardProps {
  title: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
  onSelect: () => void
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText,
  onSelect
}: PricingCardProps) {
  return (
    <Card className={`relative ${popular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Mais Popular
          </span>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">{formatCurrency(price)}</span>
          <span className="text-gray-600">/mês</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={onSelect}
          variant={popular ? 'primary' : 'outline'}
          className="w-full"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}