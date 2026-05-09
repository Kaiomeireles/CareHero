# 📋 Planejamento do Product Backlog - Sprint 3

> **Nota para a Avaliação:** Devido a instabilidades e restrições de licenciamento estudantil da plataforma Azure DevOps, a equipe optou por consolidar todo o planejamento do **Product Backlog** de forma versionada neste documento oficial. Esta abordagem garante a integridade do planejamento e o alinhamento com as práticas de metodologias ágeis (Scrum/Kanban).

---

## 🎯 1. Estrutura de Trabalho (Épicos e Features)

### 🚀 Épico 1: Hodômetro Humano (Progresso por KM)
*   **Feature 1.1:** Telemetria de Atividades
    *   **PBI 1.1.1 (História):** Como piloto, eu quero registrar minha quilometragem (corrida/pedal/natação) para avançar o nível do meu motor.
    *   **PBI 1.1.2 (História):** Como usuário, eu quero ver o Hodômetro Mundial para sentir que meu esforço contribui para a saúde global da humanidade.
*   **Feature 1.2:** Pit-Stop (Hábitos Saudáveis)
    *   **PBI 1.2.1 (História):** Como piloto, eu quero completar missões diárias (beber água, alongamento) para ganhar KM bônus e melhorar minha eficiência.

### 🔐 Épico 2: Squads e Segurança (Social & Security)
*   **Feature 2.1:** Gestão de Squads
    *   **PBI 2.1.1 (História):** Como piloto, eu quero fazer login seguro para que minha quilometragem e ranking no Squad sejam protegidos.
    *   **PBI 2.1.2 (História):** Como líder de Squad, eu quero visualizar a velocidade média e KM total dos meus amigos para incentivar a competição saudável.

---

## ⚙️ 2. Critérios de Aceite e Regras de Negócio

### 🏁 PBI 1.1.1: Registrar Quilometragem (Progresso do Motor)
*   **Descrição:** O sistema deve permitir o input de distância percorrida e atualizar o nível do motor (1 nível a cada 50 KM).
*   **Critérios de Aceite:**
    1. O sistema deve somar a quilometragem ao total acumulado do perfil.
    2. A barra de progresso de "Eficiência do Motor" deve ser atualizada visualmente.
    3. Quilometragens negativas ou irreais (ex: 500km em 1h) devem ser bloqueadas.

### 🛡️ PBI 2.1.1: Autenticação do Piloto (Login)
*   **Descrição:** Implementar a tela de login utilizando Firebase Auth para garantir a segurança dos dados de telemetria.
*   **Critérios de Aceite:**
    1. Validar formato de e-mail e senha (mínimo 6 caracteres).
    2. Persistir a sessão no dispositivo para evitar login repetitivo.
    3. Salvar o token de autenticação de forma criptografada no `SecureStore`.

---

## 📊 3. Dimensionamento, Prioridade e Dependências

| Item do Backlog (PBI) | Prioridade | Esforço (Story Points) | Dependências Técnicas |
| :--- | :---: | :---: | :--- |
| **PBI 2.1.1 (Login)** | 🔴 1 (Alta) | 5 pts | Base para segurança do perfil. |
| **PBI 1.1.1 (Registrar KM)** | 🔴 1 (Alta) | 8 pts | Depende do Login para salvar progresso. |
| **PBI 1.2.1 (Missões/Pit-Stop)** | 🟡 2 (Média) | 5 pts | Lógica de bônus de eficiência. |
| **PBI 1.1.2 (Hodômetro Global)** | 🟡 2 (Média) | 3 pts | Integração com dados globais do Firebase. |
| **PBI 2.1.2 (Squads)** | 🟢 3 (Baixa) | 8 pts | Depende da base de usuários e telemetria. |

---

## 🚀 4. Sprint Backlog (Sprint in Progress)

**Meta da Sprint:** Finalizar o módulo de Autenticação Segura e a base do Hodômetro Humano (KM).

### 📝 PBI 2.1.1: Login de Usuário (5 Story Points)
*   [x] **Task 1:** Criar UI da Central de Comando (Login) em React Native.
*   [x] **Task 2:** Configurar Firebase Auth e SecureStore.
*   [x] **Task 3:** Integrar validações de e-mail e senha.

### 📝 PBI 1.1.1: Registrar Quilometragem (8 Story Points)
*   [ ] **Task 1:** Criar lógica de soma de KM no Context API (HeroContext).
*   [ ] **Task 2:** Implementar visualização do Hodômetro na Home.
*   [ ] **Task 3:** Validar regra de negócio: Nível do Motor sobe a cada 50 KM.
