// Database simples em memória (para demonstração)
// Em produção, usar PostgreSQL, MongoDB, etc.

export interface UserSubscription {
  userId: string;
  email: string;
  planType: 'free' | 'starter' | 'pro' | 'business';
  status: 'active' | 'canceled' | 'past_due';
  customerId?: string;
  subscriptionId?: string;
  currentPeriodEnd: Date;
  monthlyUsage: number;
  createdAt: Date;
  updatedAt: Date;
}

// Armazenamento temporário em memória
const users: Map<string, UserSubscription> = new Map();

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
      updatedAt: new Date()
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
    console.log('🗑️ Todos os dados limpos');
  }
}