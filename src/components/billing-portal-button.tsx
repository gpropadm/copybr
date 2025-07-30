'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface BillingPortalButtonProps {
  customerId: string;
  className?: string;
  children: React.ReactNode;
}

export function BillingPortalButton({
  customerId,
  className,
  children
}: BillingPortalButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    if (!customerId) {
      alert('ID do cliente não encontrado');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao acessar portal');
      }

      // Redirecionar para portal de cobrança do Stripe
      window.location.href = data.portalUrl;

    } catch (error) {
      console.error('Erro no portal:', error);
      alert('Erro ao acessar portal de cobrança. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePortal}
      disabled={loading || !customerId}
      className={className}
    >
      {loading ? 'Carregando...' : children}
    </Button>
  );
}