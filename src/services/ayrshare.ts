// Ayrshare API integration for social media posting
// https://www.ayrshare.com/docs/introduction

export interface AyrshareConfig {
  apiKey: string
}

export interface SocialPost {
  post: string
  platforms: string[]
  mediaUrls?: string[]
  scheduleDate?: string
}

export interface AyrshareResponse {
  status: string
  id?: string
  message?: string
  errors?: any[]
}

export class AyrshareService {
  private apiKey: string
  private baseUrl = 'https://app.ayrshare.com/api'

  constructor(config: AyrshareConfig) {
    this.apiKey = config.apiKey
  }

  async createPost(postData: SocialPost): Promise<AyrshareResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(postData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao criar post na Ayrshare:', error)
      throw error
    }
  }

  async deletePost(postId: string): Promise<AyrshareResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ id: postId })
      })

      return await response.json()
    } catch (error) {
      console.error('Erro ao deletar post na Ayrshare:', error)
      throw error
    }
  }

  async getAnalytics(postId?: string): Promise<any> {
    try {
      const url = postId 
        ? `${this.baseUrl}/analytics/post?id=${postId}`
        : `${this.baseUrl}/analytics`

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      return await response.json()
    } catch (error) {
      console.error('Erro ao obter analytics da Ayrshare:', error)
      throw error
    }
  }

  async getConnectedAccounts(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/profiles`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      return await response.json()
    } catch (error) {
      console.error('Erro ao obter contas conectadas:', error)
      throw error
    }
  }

  // Mapeamento de plataformas do CopyBR para Ayrshare
  static mapPlatforms(platforms: string[]): string[] {
    const platformMap: { [key: string]: string } = {
      'facebook': 'facebook',
      'instagram': 'instagram', 
      'twitter': 'x',
      'linkedin': 'linkedin',
      'tiktok': 'tiktok',
      'reddit': 'reddit',
      'youtube': 'youtube',
      'pinterest': 'pinterest'
    }

    return platforms.map(platform => 
      platformMap[platform.toLowerCase()] || platform.toLowerCase()
    )
  }
}

// Instância global do serviço (será configurada quando o usuário conectar)
let ayrshareInstance: AyrshareService | null = null

export function getAyrshareInstance(): AyrshareService | null {
  return ayrshareInstance
}

export function setAyrshareInstance(apiKey: string): AyrshareService {
  ayrshareInstance = new AyrshareService({ apiKey })
  return ayrshareInstance
}