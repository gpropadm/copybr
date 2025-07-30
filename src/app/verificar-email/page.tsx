'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function VerificarEmailContent() {
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Verificar se há parâmetros de URL (verificação automática)
    const urlCode = searchParams.get('code')
    const urlEmail = searchParams.get('email')
    const success = searchParams.get('success')
    const error = searchParams.get('error')

    if (success === 'true') {
      setIsSuccess(true)
      setMessage('Email verificado com sucesso! Você pode fechar esta página.')
    } else if (error) {
      const errorMessages = {
        'invalid-link': 'Link de verificação inválido ou expirado.',
        'invalid-code': 'Código inválido ou expirado.',
        'server-error': 'Erro interno. Tente novamente.'
      }
      setMessage(errorMessages[error as keyof typeof errorMessages] || 'Erro desconhecido.')
    }

    if (urlCode) setCode(urlCode)
    if (urlEmail) setEmail(urlEmail)
  }, [searchParams])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !code) {
      setMessage('Por favor, preencha todos os campos.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
        setMessage(data.message)
        
        // Redirecionar para login após 3 segundos
        setTimeout(() => {
          router.push('/login?verified=true')
        }, 3000)
      } else {
        setMessage(data.error || 'Erro ao verificar código.')
      }
    } catch (error) {
      setMessage('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!email) {
      setMessage('Por favor, informe seu email para reenviar o código.')
      return
    }

    setResendLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          userName: email.split('@')[0] // Nome temporário
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage('Novo código enviado para seu email!')
      } else {
        setMessage(data.error || 'Erro ao reenviar código.')
      }
    } catch (error) {
      setMessage('Erro de conexão. Tente novamente.')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔐 Verificar Email
          </h1>
          <p className="text-sm text-gray-600">
            Digite o código de 6 dígitos enviado para seu email
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSuccess ? (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-lg font-semibold text-green-600 mb-2">
                Email Verificado!
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Sua conta foi ativada com sucesso.
              </p>
              <p className="text-xs text-gray-500">
                Redirecionando para o login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Código de Verificação
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest"
                  placeholder="123456"
                  maxLength={6}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Digite os 6 dígitos do código
                </p>
              </div>

              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  isSuccess 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verificando...' : 'Verificar Email'}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendLoading}
                  className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50"
                >
                  {resendLoading ? 'Reenviando...' : 'Reenviar código'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-500"
            >
              ← Voltar para o login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerificarEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <VerificarEmailContent />
    </Suspense>
  )
}