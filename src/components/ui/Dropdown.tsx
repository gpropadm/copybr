'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropdownItem {
  title: string
  href: string
  description: string
  icon?: React.ReactNode
}

interface DropdownProps {
  title: string
  items: DropdownItem[]
  className?: string
}

export default function Dropdown({ title, items, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors py-2"
      >
        <span>{title}</span>
        <ChevronDown 
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-4 z-50">
          <div className="grid gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 hover:bg-gray-50 transition-colors block"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-start space-x-3">
                  {item.icon && (
                    <div className="flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {item.description}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}