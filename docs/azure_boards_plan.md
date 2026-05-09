# 📋 Planejamento do Product Backlog - Sprint 3

> **Nota para a Avaliação:** Devido a instabilidades e restrições de licenciamento estudantil da plataforma Azure DevOps (problemas de permissão na organização), a equipe optou por consolidar todo o planejamento do **Product Backlog** de forma versionada neste documento oficial. Esta abordagem garante a integridade do planejamento e o alinhamento com as práticas de metodologias ágeis (Scrum/Kanban).

---

## 🎯 1. Estrutura de Trabalho (Épicos e Features)

### 🏥 Épico 1: Gestão de Cuidados (Care Management)
*   **Feature 1.1:** Controle de Medicações
    *   **PBI 1.1.1 (História):** Como cuidador, eu quero registrar o horário de uma medicação para não esquecer de administrá-la.
    *   **PBI 1.1.2 (História):** Como familiar, eu quero visualizar o histórico de medicações tomadas para garantir que o tratamento está sendo seguido.
*   **Feature 1.2:** Monitoramento de Sinais Vitais
    *   **PBI 1.2.1 (História):** Como cuidador, eu quero registrar a pressão arterial e a temperatura diária do paciente para acompanhamento médico.

### 🔐 Épico 2: Autenticação e Segurança (Security)
*   **Feature 2.1:** Controle de Acesso
    *   **PBI 2.1.1 (História):** Como usuário, eu quero fazer login usando e-mail e senha para acessar os dados do paciente de forma segura.
    *   **PBI 2.1.2 (História):** Como administrador, eu quero convidar novos cuidadores para o perfil de um paciente, limitando o acesso a apenas pessoas autorizadas.

---

## ⚙️ 2. Critérios de Aceite e Regras de Negócio

Abaixo estão os detalhes das histórias (PBIs) selecionadas para a **Sprint Atual**:

### 💊 PBI 1.1.1: Registrar horário de medicação
*   **Descrição:** O sistema deve permitir que o cuidador crie um alarme/registro para uma nova medicação, informando nome, dosagem e horário.
*   **Critérios de Aceite:**
    1. O formulário deve conter campos obrigatórios para: *Nome do Remédio*, *Dosagem* e *Horário*.
    2. O sistema deve emitir uma notificação push no horário configurado.
    3. Não deve ser possível salvar um registro com horário no passado.

### 🛡️ PBI 2.1.1: Login de Usuário
*   **Descrição:** Implementar a tela de login utilizando Firebase Auth para garantir a segurança no acesso ao aplicativo.
*   **Critérios de Aceite:**
    1. Deve validar se o e-mail tem um formato válido via Regex.
    2. A senha deve estar oculta (com opção de "mostrar senha" e mínimo de 6 caracteres).
    3. Em caso de erro de credenciais, exibir mensagem genérica de erro (evitar enumeração de usuários).
    4. O login deve gerar um token de sessão salvo seguramente utilizando `SecureStore`.

---

## 📊 3. Dimensionamento, Prioridade e Dependências

| Item do Backlog (PBI) | Prioridade | Esforço (Story Points) | Dependências Técnicas |
| :--- | :---: | :---: | :--- |
| **PBI 2.1.1 (Login)** | 🔴 1 (Alta) | 5 pts | Nenhuma. (Base do sistema). |
| **PBI 1.1.1 (Medicação)** | 🔴 1 (Alta) | 8 pts | Depende do **PBI 2.1.1** (Requer usuário logado). |
| **PBI 2.1.2 (Convites)** | 🟡 2 (Média) | 3 pts | Depende do **PBI 2.1.1** (Requer permissão de Admin). |
| **PBI 1.1.2 (Histórico)** | 🟡 2 (Média) | 5 pts | Depende do **PBI 1.1.1** (Requer dados preenchidos). |
| **PBI 1.2.1 (Sinais Vitais)** | 🟢 3 (Baixa) | 3 pts | Depende do **PBI 2.1.1**. |

*A ordenação do backlog prioriza a liberação da fundação de segurança (Login) antes da lógica de negócios (Medicação).*

---

## 🚀 4. Sprint Backlog (Sprint in Progress)

**Meta da Sprint:** Entregar o sistema de Autenticação Seguro e o CRUD básico de Medicações.

### 📝 PBI 2.1.1: Login de Usuário (5 Story Points)
**Plano de Tarefas (Tasks):**
*   [x] **Task 1:** Criar a UI da Tela de Login em React Native (Esforço: 2h). 
*   [x] **Task 2:** Configurar Firebase Auth no projeto (Esforço: 1h). 
*   [x] **Task 3:** Integrar formulário com Firebase Auth e salvar token no `SecureStore` (Esforço: 3h). 
*   [ ] **Task 4:** Criar testes unitários para a validação de e-mail e senha (Esforço: 2h). 

### 📝 PBI 1.1.1: Registrar horário de medicação (8 Story Points)
**Plano de Tarefas (Tasks):**
*   [ ] **Task 1:** Criar a modelagem no banco de dados (Firestore) para a coleção `medications` (Esforço: 2h).
*   [ ] **Task 2:** Desenvolver a UI do formulário de cadastro de medicação (Esforço: 3h).
*   [ ] **Task 3:** Integrar o formulário com a API do Firestore para salvar os dados (Esforço: 3h).
*   [ ] **Task 4:** Configurar biblioteca `expo-notifications` para disparar alertas locais (Esforço: 4h).
