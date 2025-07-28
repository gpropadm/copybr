import CopyGenerator from '@/components/copy/CopyGenerator'

export default function GerarPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gerador de Copy com IA
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Crie textos persuasivos que convertem em segundos. 
            Escolha um template e descreva seu produto ou serviço.
          </p>
        </div>
        
        <CopyGenerator />
      </div>
    </div>
  )
}