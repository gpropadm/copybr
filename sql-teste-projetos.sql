-- SQL para testar cores dos cards de projetos
-- Execute no seu banco PostgreSQL

-- ========================================
-- 1. SQL para 5 projetos (COR LARANJA - 50% do limite)
-- ========================================

INSERT INTO projects (id, "userId", name, type, description, status, "createdAt", "updatedAt") VALUES
('proj_test_001', 'demo-user', 'Campanha Black Friday', 'marketing', 'Campanha promocional para Black Friday 2024', 'ativo', NOW(), NOW()),
('proj_test_002', 'demo-user', 'Lançamento Produto X', 'vendas', 'Copy para lançamento do novo produto', 'ativo', NOW(), NOW()),
('proj_test_003', 'demo-user', 'Newsletter Mensal', 'email-marketing', 'Conteúdo para newsletter de dezembro', 'ativo', NOW(), NOW()),
('proj_test_004', 'demo-user', 'Posts Instagram', 'redes-sociais', 'Conteúdo para redes sociais', 'ativo', NOW(), NOW()),
('proj_test_005', 'demo-user', 'Landing Page Nova', 'web', 'Copy para nova landing page', 'ativo', NOW(), NOW());

-- ========================================
-- 2. SQL para 9 projetos (COR VERMELHA - 90% do limite)
-- ========================================

INSERT INTO projects (id, "userId", name, type, description, status, "createdAt", "updatedAt") VALUES
('proj_test_001', 'demo-user', 'Campanha Black Friday', 'marketing', 'Campanha promocional para Black Friday 2024', 'ativo', NOW(), NOW()),
('proj_test_002', 'demo-user', 'Lançamento Produto X', 'vendas', 'Copy para lançamento do novo produto', 'ativo', NOW(), NOW()),
('proj_test_003', 'demo-user', 'Newsletter Mensal', 'email-marketing', 'Conteúdo para newsletter de dezembro', 'ativo', NOW(), NOW()),
('proj_test_004', 'demo-user', 'Posts Instagram', 'redes-sociais', 'Conteúdo para redes sociais', 'ativo', NOW(), NOW()),
('proj_test_005', 'demo-user', 'Landing Page Nova', 'web', 'Copy para nova landing page', 'ativo', NOW(), NOW()),
('proj_test_006', 'demo-user', 'E-mail Abandoned Cart', 'email-marketing', 'Sequência de e-mails para carrinho abandonado', 'ativo', NOW(), NOW()),
('proj_test_007', 'demo-user', 'Anúncios Google Ads', 'publicidade', 'Campanhas para Google Ads', 'ativo', NOW(), NOW()),
('proj_test_008', 'demo-user', 'Webinar Dezembro', 'eventos', 'Copy para webinar de fim de ano', 'ativo', NOW(), NOW()),
('proj_test_009', 'demo-user', 'Pesquisa Satisfação', 'pesquisa', 'Copy para pesquisa de satisfação', 'ativo', NOW(), NOW());

-- ========================================
-- 3. SQL para LIMPAR os projetos de teste
-- ========================================

DELETE FROM projects WHERE "userId" = 'demo-user' AND id LIKE 'proj_test_%';

-- ========================================
-- INSTRUÇÕES DE USO:
-- ========================================

-- Para testar COR LARANJA (5/10 projetos):
-- 1. Execute apenas o primeiro INSERT (5 projetos)
-- 2. Acesse https://copybr.vercel.app/dashboard/meu-consumo
-- 3. A barra deve estar LARANJA

-- Para testar COR VERMELHA (9/10 projetos):
-- 1. Execute o segundo INSERT (9 projetos) 
-- 2. Acesse https://copybr.vercel.app/dashboard/meu-consumo
-- 3. A barra deve estar VERMELHA

-- Para limpar:
-- Execute o DELETE no final