// Configurações e utilitários para APIs das redes sociais

export interface SocialAccount {
  id: string
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter'
  username: string
  accessToken: string
  refreshToken?: string
  expiresAt?: Date
  isActive: boolean
}

export interface PostContent {
  text: string
  image?: string
  link?: string
  hashtags?: string[]
}

export interface ScheduledPost {
  id: string
  userId: string
  projectId: string
  platform: SocialAccount['platform']
  content: PostContent
  scheduledFor: Date
  status: 'pending' | 'published' | 'failed'
  publishedAt?: Date
  errorMessage?: string
}

// Facebook Graph API
export class FacebookAPI {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async publishPost(content: PostContent): Promise<{ success: boolean; postId?: string; error?: string }> {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/me/feed`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.text,
          link: content.link,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, postId: data.id }
      } else {
        return { success: false, error: data.error?.message || 'Erro ao publicar no Facebook' }
      }
    } catch (error) {
      return { success: false, error: 'Erro de conexão com Facebook' }
    }
  }

  async getPageInfo(): Promise<{ id: string; name: string; accessToken: string } | null> {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${this.accessToken}`)
      const data = await response.json()
      
      if (data.data && data.data.length > 0) {
        return data.data[0] // Primeira página
      }
      return null
    } catch (error) {
      return null
    }
  }
}

// Instagram Basic Display API
export class InstagramAPI {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async publishPost(content: PostContent): Promise<{ success: boolean; postId?: string; error?: string }> {
    try {
      // Instagram API requer processo em 2 etapas
      // 1. Criar container de mídia
      // 2. Publicar container
      
      // Para texto simples, usa Instagram Graph API (requer página do Facebook conectada)
      const response = await fetch(`https://graph.facebook.com/v18.0/me/media`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caption: content.text,
          media_type: 'TEXT', // Para posts só de texto
        }),
      })

      const containerData = await response.json()

      if (!response.ok) {
        return { success: false, error: containerData.error?.message || 'Erro ao criar post no Instagram' }
      }

      // Publicar o container
      const publishResponse = await fetch(`https://graph.facebook.com/v18.0/me/media_publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creation_id: containerData.id,
        }),
      })

      const publishData = await publishResponse.json()

      if (publishResponse.ok) {
        return { success: true, postId: publishData.id }
      } else {
        return { success: false, error: publishData.error?.message || 'Erro ao publicar no Instagram' }
      }
    } catch (error) {
      return { success: false, error: 'Erro de conexão com Instagram' }
    }
  }
}

// LinkedIn API
export class LinkedInAPI {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async publishPost(content: PostContent): Promise<{ success: boolean; postId?: string; error?: string }> {
    try {
      // Primeiro, pegar ID da pessoa
      const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        },
      })

      const profileData = await profileResponse.json()
      const personId = profileData.id

      // Publicar post
      const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify({
          author: `urn:li:person:${personId}`,
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.ShareContent': {
              shareCommentary: {
                text: content.text,
              },
              shareMediaCategory: 'NONE',
            },
          },
          visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        return { success: true, postId: data.id }
      } else {
        return { success: false, error: 'Erro ao publicar no LinkedIn' }
      }
    } catch (error) {
      return { success: false, error: 'Erro de conexão com LinkedIn' }
    }
  }
}

// Utilitários
export const SOCIAL_PLATFORMS = {
  facebook: {
    name: 'Facebook',
    icon: '📘',
    color: 'bg-blue-600',
    authUrl: process.env.NEXT_PUBLIC_FACEBOOK_AUTH_URL,
  },
  instagram: {
    name: 'Instagram',
    icon: '📷',
    color: 'bg-pink-600',
    authUrl: process.env.NEXT_PUBLIC_INSTAGRAM_AUTH_URL,
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-700',
    authUrl: process.env.NEXT_PUBLIC_LINKEDIN_AUTH_URL,
  },
  twitter: {
    name: 'Twitter/X',
    icon: '🐦',
    color: 'bg-black',
    authUrl: process.env.NEXT_PUBLIC_TWITTER_AUTH_URL,
  },
} as const

export function getSocialAPI(platform: SocialAccount['platform'], accessToken: string) {
  switch (platform) {
    case 'facebook':
      return new FacebookAPI(accessToken)
    case 'instagram':
      return new InstagramAPI(accessToken)
    case 'linkedin':
      return new LinkedInAPI(accessToken)
    default:
      throw new Error(`Plataforma ${platform} não suportada`)
  }
}