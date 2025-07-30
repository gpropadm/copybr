'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { PlanType } from '@/lib/asaas';

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
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [pixData, setPixData] = useState<{
    pixCode: string;
    qrCode: string;
    paymentId: string;
  } | null>(null);

  const handleCheckout = async (paymentMethod: 'PIX' | 'CREDIT_CARD') => {
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
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erro na API:', data);
        throw new Error(data.details || data.error || 'Erro ao processar pagamento');
      }

      if (paymentMethod === 'PIX') {
        // Mostrar dados do PIX
        setPixData({
          pixCode: data.pixCode,
          qrCode: data.qrCode,
          paymentId: data.paymentId
        });
      } else {
        // Redirecionar para checkout de cartão
        window.location.href = data.checkoutUrl;
      }

    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (pixData) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-center">Pagamento via PIX</h3>
        
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code ou copie o código PIX:</p>
          <img 
            src={`data:image/png;base64,${pixData.qrCode}`} 
            alt="QR Code PIX" 
            className="mx-auto mb-4 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Código PIX:</p>
          <div className="flex">
            <input 
              type="text" 
              value={pixData.pixCode} 
              readOnly 
              className="flex-1 p-2 text-xs border rounded-l bg-gray-50 font-mono"
            />
            <button
              onClick={() => navigator.clipboard.writeText(pixData.pixCode)}
              className="px-3 py-2 bg-blue-500 text-white rounded-r text-xs hover:bg-blue-600"
            >
              Copiar
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setPixData(null)}
            className="flex-1 bg-gray-500 hover:bg-gray-600"
          >
            Voltar
          </Button>
          <Button 
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            Verificar Pagamento
          </Button>
        </div>
      </div>
    );
  }

  if (showPaymentMethods) {
    return (
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => handleCheckout('PIX')}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Processando...' : '💰 Pagar com PIX'}
        </Button>
        <Button
          onClick={() => handleCheckout('CREDIT_CARD')}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Processando...' : '💳 Pagar com Cartão'}
        </Button>
        <Button
          onClick={() => setShowPaymentMethods(false)}
          className="bg-gray-500 hover:bg-gray-600"
        >
          Cancelar
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setShowPaymentMethods(true)}
      disabled={loading}
      className={className}
    >
      {loading ? 'Processando...' : children}
    </Button>
  );
}