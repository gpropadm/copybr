// Social Media Posting Service
// Using multiple approaches for reliable social media posting

export interface SocialPost {
  content: string
  platforms: string[]
  mediaUrls?: string[]
  scheduleDate?: string
}

export interface PostingResponse {
  success: boolean
  message: string
  postId?: string
  errors?: string[]
}

export class SocialPostingService {
  // Webhook URLs para Zapier/IFTTT integrations
  private webhookUrls = {
    zapier: process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL || '',
    ifttt: process.env.NEXT_PUBLIC_IFTTT_WEBHOOK_URL || ''
  }

  async createPost(postData: SocialPost): Promise<PostingResponse> {
    try {
      // Primeiro tenta via Zapier
      if (this.webhookUrls.zapier) {
        return await this.postViaZapier(postData)
      }

      // Fallback para IFTTT
      if (this.webhookUrls.ifttt) {
        return await this.postViaIFTTT(postData)
      }

      // Fallback para simulação com instruções
      return this.simulateWithInstructions(postData)

    } catch (error) {
      console.error('Erro ao criar post:', error)
      return {
        success: false,
        message: 'Erro ao publicar nas redes sociais',
        errors: [error instanceof Error ? error.message : 'Erro desconhecido']
      }
    }
  }

  private async postViaZapier(postData: SocialPost): Promise<PostingResponse> {
    try {
      const response = await fetch(this.webhookUrls.zapier, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: postData.content,
          platforms: postData.platforms,
          mediaUrls: postData.mediaUrls || [],
          scheduleDate: postData.scheduleDate,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        return {
          success: true,
          message: 'Post enviado via Zapier com sucesso!',
          postId: `zapier_${Date.now()}`
        }
      } else {
        throw new Error(`Zapier webhook failed: ${response.status}`)
      }
    } catch (error) {
      throw error
    }
  }

  private async postViaIFTTT(postData: SocialPost): Promise<PostingResponse> {
    try {
      const response = await fetch(this.webhookUrls.ifttt, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value1: postData.content,
          value2: postData.platforms.join(', '),
          value3: postData.mediaUrls?.join(', ') || ''
        })
      })

      if (response.ok) {
        return {
          success: true,
          message: 'Post enviado via IFTTT com sucesso!',
          postId: `ifttt_${Date.now()}`
        }
      } else {
        throw new Error(`IFTTT webhook failed: ${response.status}`)
      }
    } catch (error) {
      throw error
    }
  }

  private simulateWithInstructions(postData: SocialPost): PostingResponse {
    // Cria instruções claras para publicação manual
    const instructions = this.generatePostingInstructions(postData)
    
    // Salva as instruções localmente para o usuário
    const postId = `manual_${Date.now()}`
    localStorage.setItem(`post_instructions_${postId}`, JSON.stringify({
      content: postData.content,
      platforms: postData.platforms,
      instructions,
      createdAt: new Date().toISOString()
    }))

    return {
      success: true,
      message: 'Instruções de publicação geradas! Clique para ver detalhes.',
      postId
    }
  }

  private generatePostingInstructions(postData: SocialPost): string[] {
    const instructions: string[] = []
    
    instructions.push(`📝 CONTEÚDO PARA PUBLICAR:`)
    instructions.push(`"${postData.content}"`)
    instructions.push(``)
    
    instructions.push(`🎯 PLATAFORMAS:`)
    postData.platforms.forEach(platform => {
      instructions.push(`• ${this.getPlatformName(platform)}`)
    })
    instructions.push(``)

    if (postData.mediaUrls && postData.mediaUrls.length > 0) {
      instructions.push(`📷 MÍDIAS:`)
      postData.mediaUrls.forEach((url, index) => {
        instructions.push(`${index + 1}. ${url}`)
      })
      instructions.push(``)
    }

    if (postData.scheduleDate) {
      instructions.push(`⏰ AGENDAR PARA: ${new Date(postData.scheduleDate).toLocaleString('pt-BR')}`)
      instructions.push(``)
    }

    instructions.push(`📋 PASSOS:`)
    instructions.push(`1. Copie o conteúdo acima`)
    instructions.push(`2. Abra cada rede social`)
    instructions.push(`3. Cole e publique o conteúdo`)
    instructions.push(`4. Adicione as mídias se houver`)

    return instructions
  }

  private getPlatformName(platform: string): string {
    const platformNames: { [key: string]: string } = {
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'twitter': 'Twitter/X',
      'linkedin': 'LinkedIn',
      'tiktok': 'TikTok',
      'youtube': 'YouTube'
    }
    return platformNames[platform.toLowerCase()] || platform
  }

  getPostInstructions(postId: string): any {
    const instructions = localStorage.getItem(`post_instructions_${postId}`)
    return instructions ? JSON.parse(instructions) : null
  }

  markPostAsCompleted(postId: string): void {
    const instructions = this.getPostInstructions(postId)
    if (instructions) {
      instructions.completedAt = new Date().toISOString()
      localStorage.setItem(`post_instructions_${postId}`, JSON.stringify(instructions))
    }
  }
}

// Instância global do serviço
export const socialPostingService = new SocialPostingService()