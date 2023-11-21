## Triple Seven - Gerenciador de Projetos

### Descrição

O **Triple Seven** é um sistema de gerenciamento de projetos projetado para facilitar a colaboração e o acompanhamento do progresso das tarefas em equipes ágeis. Similar ao Trello ou Jira, o Triple Seven permite que os Scrum Masters ou líderes de projetos criem quadros para organizar e documentar as atividades do projeto. Os usuários convidados podem então colaborar, criar tarefas e movê-las entre as sprints do projeto para monitorar o progresso de forma eficiente.

### Funcionalidades

- **Quadros de Projeto**: Crie quadros para cada projeto, fornecendo uma visão geral do andamento.

- **Convites de Usuários**: Convide membros da equipe para participar do projeto, dando-lhes acesso às funcionalidades do sistema.

- **Tasks**: Crie, atribua e gerencie tarefas no quadro do projeto.

- **Sprints**: Organize as tarefas em sprints para acompanhar o progresso em intervalos definidos.

### Tecnologias Utilizadas

- **Docker**: Utilizado para a conteinerização, garantindo a consistência e portabilidade do ambiente de desenvolvimento.

- **TypeScript**: Linguagem principal para o desenvolvimento do backend, proporcionando tipagem estática e melhorando a manutenibilidade do código.

- **Sequelize**: ORM (Object-Relational Mapping) utilizado para interagir com o banco de dados MySQL de maneira eficiente.

- **NodeJS**: Plataforma de execução de código JavaScript do lado do servidor para criar uma aplicação web escalável e eficiente.

### Configuração do Ambiente

1. Clone o repositório para a sua máquina local.
   ```bash
   git clone https://github.com/kaiquerbezerra/triple-seven.git
2. cd triple seven
3. Crie um arquivo .env e adicione as variáveis de ambiente
4. Verifique se exite conexão com o banco de dados
5. docker compose up