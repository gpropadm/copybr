// Database simples em memória (para demonstração)
// Em produção, usar PostgreSQL, MongoDB, etc.

export interface UserSubscription {
  userId: string;
  email: string;
  planType: 'free' | 'starter' | 'pro' | 'business';
  status: 'active' | 'canceled' | 'past_due' | 'pending';
  customerId?: string;
  subscriptionId?: string;
  currentPeriodEnd: Date;
  monthlyUsage: number;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

export interface EmailVerification {
  email: string;
  code: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

// Armazenamento temporário em memória
const users: Map<string, UserSubscription> = new Map();
const emailVerifications: Map<string, EmailVerification> = new Map();

export class Database {
  // Criar ou atualizar usuário
  static async upsertUser(data: Partial<UserSubscription> & { userId: string }): Promise<UserSubscription> {
    const existing = users.get(data.userId);
    
    const user: UserSubscription = {
      userId: data.userId,
      email: data.email || existing?.email || '',
      planType: data.planType || existing?.planType || 'free',
      status: data.status || existing?.status || 'active',
      customerId: data.customerId || existing?.customerId,
      subscriptionId: data.subscriptionId || existing?.subscriptionId,
      currentPeriodEnd: data.currentPeriodEnd || existing?.currentPeriodEnd || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      monthlyUsage: data.monthlyUsage !== undefined ? data.monthlyUsage : existing?.monthlyUsage || 0,
      createdAt: existing?.createdAt || new Date(),
      updatedAt: new Date(),
      emailVerified: data.emailVerified !== undefined ? data.emailVerified : existing?.emailVerified || false
    };
    
    users.set(data.userId, user);
    console.log('🗄️ Usuário salvo:', user);
    return user;
  }

  // Buscar usuário
  static async getUser(userId: string): Promise<UserSubscription | null> {
    return users.get(userId) || null;
  }

  // Buscar por customer do Stripe
  static async getUserByCustomerId(customerId: string): Promise<UserSubscription | null> {
    for (const user of users.values()) {
      if (user.customerId === customerId) {
        return user;
      }
    }
    return null;
  }

  // Incrementar uso mensal
  static async incrementUsage(userId: string, amount: number = 1): Promise<UserSubscription | null> {
    const user = users.get(userId);
    if (!user) return null;

    user.monthlyUsage += amount;
    user.updatedAt = new Date();
    users.set(userId, user);
    
    console.log(`📈 Uso incrementado para ${userId}: ${user.monthlyUsage}`);
    return user;
  }

  // Resetar uso mensal (executar todo mês)
  static async resetMonthlyUsage(userId: string): Promise<void> {
    const user = users.get(userId);
    if (user) {
      user.monthlyUsage = 0;
      user.updatedAt = new Date();
      users.set(userId, user);
      console.log(`🔄 Uso resetado para ${userId}`);
    }
  }

  // Verificar se usuário pode gerar copy
  static async canGenerateCopy(userId: string): Promise<{ allowed: boolean; reason?: string; usage?: number; limit?: number }> {
    const user = users.get(userId);
    if (!user) {
      return { allowed: false, reason: 'Usuário não encontrado' };
    }

    // Verificar se o período expirou e resetar automaticamente
    const now = new Date();
    if (now > user.currentPeriodEnd) {
      console.log(`🔄 Período expirado para ${userId}, resetando...`);
      
      // Resetar uso
      await this.resetMonthlyUsage(userId);
      
      // Para planos gratuitos, estender período
      if (user.planType === 'free') {
        await this.upsertUser({
          userId,
          currentPeriodEnd: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        });
      }
      
      // Atualizar referência local
      const updatedUser = users.get(userId);
      if (updatedUser) {
        user.monthlyUsage = updatedUser.monthlyUsage;
        user.currentPeriodEnd = updatedUser.currentPeriodEnd;
      }
    }

    // Verificar limites por plano
    const limits = {
      free: 10,
      starter: 100,
      pro: 1000,
      business: -1 // Ilimitado
    };

    const limit = limits[user.planType];
    
    // Ilimitado
    if (limit === -1) {
      return { allowed: true, usage: user.monthlyUsage, limit: -1 };
    }

    // Verificar se excedeu limite
    if (user.monthlyUsage >= limit) {
      return { 
        allowed: false, 
        reason: `Limite mensal excedido (${user.monthlyUsage}/${limit})`,
        usage: user.monthlyUsage,
        limit
      };
    }

    return { 
      allowed: true, 
      usage: user.monthlyUsage, 
      limit 
    };
  }

  // Listar todos os usuários (para debug)
  static async getAllUsers(): Promise<UserSubscription[]> {
    return Array.from(users.values());
  }

  // Limpar todos os dados (para debug)
  static async clearAll(): Promise<void> {
    users.clear();
    emailVerifications.clear();
    console.log('🗑️ Todos os dados limpos');
  }

  // ===== VERIFICAÇÃO DE EMAIL =====

  // Gerar código de verificação
  static generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  }

  // Criar código de verificação
  static async createEmailVerification(email: string): Promise<string> {
    const code = this.generateVerificationCode();
    const verification: EmailVerification = {
      email,
      code,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
      attempts: 0,
      createdAt: new Date()
    };
    
    emailVerifications.set(email, verification);
    console.log(`📧 Código gerado para ${email}: ${code}`);
    return code;
  }

  // Verificar código (com ou sem email específico)
  static async verifyEmailCode(email: string, code: string): Promise<{ success: boolean; message: string; email?: string }> {
    let verification;
    let foundEmail = email;
    
    if (email) {
      // Busca por email específico
      verification = emailVerifications.get(email);
    } else {
      // Busca o código em todos os emails (quando só temos o código)
      for (const [verificationEmail, verificationData] of emailVerifications.entries()) {
        if (verificationData.code === code) {
          verification = verificationData;
          foundEmail = verificationEmail;
          break;
        }
      }
    }
    
    if (!verification) {
      return { success: false, message: 'Código não encontrado. Solicite um novo código.' };
    }

    // Verificar se expirou
    if (new Date() > verification.expiresAt) {
      emailVerifications.delete(foundEmail);
      return { success: false, message: 'Código expirado. Solicite um novo código.' };
    }

    // Incrementar tentativas
    verification.attempts++;

    // Verificar limite de tentativas
    if (verification.attempts > 3) {
      emailVerifications.delete(foundEmail);
      return { success: false, message: 'Muitas tentativas. Solicite um novo código.' };
    }

    // Verificar código
    if (verification.code !== code) {
      return { success: false, message: `Código incorreto. Tentativas restantes: ${4 - verification.attempts}` };
    }

    // Sucesso - remover código usado
    emailVerifications.delete(foundEmail);
    return { success: true, message: 'Email verificado com sucesso!', email: foundEmail };
  }

  // Marcar email como verificado
  static async markEmailAsVerified(userId: string): Promise<void> {
    const user = users.get(userId);
    if (user) {
      user.emailVerified = true;
      user.updatedAt = new Date();
      users.set(userId, user);
      console.log(`✅ Email verificado para usuário ${userId}`);
    }
  }

  // Limpar códigos expirados (executar periodicamente)
  static async cleanExpiredCodes(): Promise<void> {
    const now = new Date();
    for (const [email, verification] of emailVerifications.entries()) {
      if (now > verification.expiresAt) {
        emailVerifications.delete(email);
        console.log(`🗑️ Código expirado removido: ${email}`);
      }
    }
  }
}