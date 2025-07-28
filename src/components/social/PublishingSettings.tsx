'use client'

import { useState, useEffect } from 'react'
import { Settings, Save, Clock, Bell, Zap, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface PublishingSettingsData {
  autoPublish: boolean
  scheduleEnabled: boolean
  defaultScheduleHours: number
  notificationsEnabled: boolean
  maxPostsPerDay: number
  platforms: {
    facebook: boolean
    instagram: boolean
    linkedin: boolean
    twitter: boolean
  }
}

interface PublishingSettingsProps {
  userId: string
  onSettingsChange?: () => void
}

export default function PublishingSettings({ userId, onSettingsChange }: PublishingSettingsProps) {
  const [settings, setSettings] = useState<PublishingSettingsData>({
    autoPublish: true,
    scheduleEnabled: false,
    defaultScheduleHours: 2,
    notificationsEnabled: true,
    maxPostsPerDay: 10,
    platforms: {
      facebook: true,
      instagram: true,
      linkedin: true,
      twitter: true
    }
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [userId])

  const loadSettings = async () => {
    try {
      if (!userId) return

      const response = await fetch('/api/social/settings', {
        headers: {
          'x-user-id': userId
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          setSettings(result.data)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/social/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId
        },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        if (onSettingsChange) onSettingsChange()
        // Feedback visual de sucesso
        const originalText = document.querySelector('#save-btn')?.textContent
        const btn = document.querySelector('#save-btn') as HTMLButtonElement
        if (btn) {
          btn.textContent = 'Salvo!'
          setTimeout(() => {
            btn.textContent = originalText || 'Salvar Configurações'
          }, 2000)
        }
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (updates: Partial<PublishingSettingsData>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  const updatePlatformSettings = (platform: keyof PublishingSettingsData['platforms'], enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [platform]: enabled
      }
    }))
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#693ee0]"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações de Publicação
          </CardTitle>
          <CardDescription>
            Configure como seus posts serão publicados nas redes sociais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Publicação Automática */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <h3 className="font-medium">Publicação Automática</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Publique automaticamente ao gerar novos copies
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoPublish}
                  onChange={(e) => updateSettings({ autoPublish: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Agendamento */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <h3 className="font-medium">Agendamento Inteligente</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Agendar posts para os melhores horários
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.scheduleEnabled}
                  onChange={(e) => updateSettings({ scheduleEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {settings.scheduleEnabled && (
              <div className="ml-6 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agendar para (horas a partir de agora)
                  </label>
                  <select
                    value={settings.defaultScheduleHours}
                    onChange={(e) => updateSettings({ defaultScheduleHours: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={1}>1 hora</option>
                    <option value={2}>2 horas</option>
                    <option value={4}>4 horas</option>
                    <option value={8}>8 horas</option>
                    <option value={24}>24 horas</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Notificações */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-green-600" />
                  <h3 className="font-medium">Notificações</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Receber notificações sobre publicações
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notificationsEnabled}
                  onChange={(e) => updateSettings({ notificationsEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          {/* Limite de Posts */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-600" />
              <h3 className="font-medium">Limite Diário</h3>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Máximo de posts por dia: {settings.maxPostsPerDay}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={settings.maxPostsPerDay}
                onChange={(e) => updateSettings({ maxPostsPerDay: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações por Plataforma */}
      <Card>
        <CardHeader>
          <CardTitle>Plataformas Ativas</CardTitle>
          <CardDescription>
            Escolha em quais plataformas publicar por padrão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries({
              facebook: { name: 'Facebook', icon: '📘', color: 'blue' },
              instagram: { name: 'Instagram', icon: '📷', color: 'pink' },
              linkedin: { name: 'LinkedIn', icon: '💼', color: 'blue' },
              twitter: { name: 'Twitter', icon: '🐦', color: 'sky' }
            }).map(([key, platform]) => (
              <div
                key={key}
                className={`p-3 border-2 rounded-lg transition-all ${
                  settings.platforms[key as keyof typeof settings.platforms]
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{platform.icon}</span>
                    <span className="font-medium text-sm">{platform.name}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.platforms[key as keyof typeof settings.platforms]}
                      onChange={(e) => updatePlatformSettings(key as keyof typeof settings.platforms, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button
          id="save-btn"
          onClick={saveSettings}
          disabled={saving}
          className="min-w-[160px]"
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Salvando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Configurações
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}