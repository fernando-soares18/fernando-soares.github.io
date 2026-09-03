# Fernando Soares | Portfólio

Portfólio de Fernando Soares, desenvolvedor Front-end. Aqui estão reunidos projetos de estudo e um projeto real desenvolvido para cliente, com foco em interfaces responsivas, organização visual e experiência do usuário.

## Acesse

- [Ver portfólio publicado](https://fernando-soares18.github.io/fernando-soares.github.io/)
- [Ver projeto Dr. Charles Genehr](https://drcharlesgenehr.com.br)
- [GitHub](https://github.com/fernando-soares18)

## Projeto em destaque

### Dr. Charles Genehr

Site profissional desenvolvido para apresentar o trabalho médico, organizar conteúdos e facilitar o contato com pacientes.

O projeto inclui:

- Página institucional responsiva
- Artigos e biblioteca de eBooks
- Painel administrativo
- Integração com WhatsApp
- Publicação e manutenção do site

## Outros projetos

- Netflix Clone: estudo de interface e responsividade
- Cronômetro: lógica e manipulação de interface em JavaScript
- Calculadora Interativa: histórico, atalhos de teclado, porcentagem e tratamento de erros

## Tecnologias

HTML5, CSS3, JavaScript, PHP, JSON, Git e GitHub Pages.

## Estrutura

```text
.
├── index.html       # Página principal do portfólio
├── calculadora.html # Projeto da calculadora
├── style.css        # Estilos principais
├── css/             # Estilos de projetos antigos
├── js/              # Scripts de interação
├── img/             # Imagens e mídias dos projetos
└── .github/         # Configuração de publicação
```

## Executar localmente

Abra `index.html` no navegador ou use uma extensão de servidor local no VS Code para visualizar o portfólio.

## Nandolino e segurança
O Nandolino funciona em modo local com respostas contextuais sobre o portfólio e fluxo para WhatsApp. Não publique chaves de API no HTML/JavaScript do GitHub Pages. Para integrar Gemini ou outra IA externa em produção, use um backend/serverless como proxy e mantenha a chave apenas no servidor.

## Painel secreto de métricas (coruja)

A coruja grande da tela inicial agora possui um gesto secreto: **segure por 3 segundos** para abrir `analytics.html`.
O gesto é apenas um atalho; o painel exige autenticação no Supabase.

### Ativação do Analytics
1. Crie um projeto gratuito no Supabase.
2. Abra o SQL Editor e execute `analytics/setup.sql`.
3. Em Authentication, crie manualmente o usuário administrador (e-mail + senha) e desative novos cadastros públicos.
4. Em `analytics/config.js`, preencha somente `supabaseUrl` e a chave **anon/publishable** do projeto.
5. Publique os arquivos no GitHub Pages.

**Nunca use a chave `service_role` no portfólio.** A chave anon/publishable pode ficar no front-end porque as permissões reais são controladas pelo RLS configurado em `setup.sql`.

O painel mostra: visitantes únicos estimados por navegador, visualizações, pessoas que abriram o Nandolino, cliques no WhatsApp, taxa de conversão e projetos mais clicados.
