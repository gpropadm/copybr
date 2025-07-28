'use client'

import { usePathname } from 'next/navigation'
import Navbar from './layout/Navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Não mostrar navbar nas páginas do dashboard
  if (pathname?.startsWith('/dashboard')) {
    return null
  }
  
  return <Navbar />
}