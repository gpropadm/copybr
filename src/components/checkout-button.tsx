'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { PlanType } from '@/lib/stripe';

interface CheckoutButtonProps {
  planType: PlanType;
  userId?: string;
  userEmail?: string;
  className?: string;
  children: React.ReactNode;
}

export function CheckoutButton({
  planType,
  userId = 'demo-user',
  userEmail = 'demo@copybr.com.br',
  className,
  children
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (planType === 'free') {
      // Para plano gratuito, redirecionar para cadastro
      window.location.href = '/auth/signup';
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          userId,
          userEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erro na API:', data);
        throw new Error(data.details || data.error || 'Erro ao processar pagamento');
      }

      // Redirecionar para checkout do Stripe
      window.location.href = data.checkoutUrl;

    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? 'Processando...' : children}
    </Button>
  );
}