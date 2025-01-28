# Projeto React com Vite

Este é um projeto simples utilizando React e Vite, uma ferramenta de build rápida e moderna para desenvolvimento front-end. Sua finalidade é exibir uma lista com os primeiros 151 pokémons, permitindo clicar em cada um deles para ver mais informações.

### Projeto com caráter educativo, para aprimorar meus conhecimentos em React, Vite e Typescript

## 🚀 Começando

Siga as instruções abaixo para rodar o projeto localmente em sua máquina.

### Pré-requisitos

Antes de começar, verifique se você tem os seguintes pré-requisitos instalados:

- [Node.js](https://nodejs.org/) (versão 18.18 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes)

Se você não tem o Node.js e o npm instalados, instale-os a partir do [site oficial do Node.js](https://nodejs.org/).

### Instalar dependências

1. Clone o repositório e acesse o diretório:
   ```bash
   git clone https://github.com/otaciliow/react-ecommerce.git
   cd react-ecommerce

2. Instale as dependências do projeto:

  ```bash
  npm install
  ```
*Rodando o projeto*

1. Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento com o seguinte comando:

  ```bash
  npm run dev
  ```
2. Acesse o projeto no navegador através de:

  ```bash
  http://localhost:5173
  ```
*Comandos úteis*

`npm run dev`: Inicia o servidor de desenvolvimento em http://localhost:5173.

`npm run build`: Cria uma versão otimizada para produção do seu projeto.

`npm run preview`: Visualiza a versão de produção gerada.

## 💻 Estrutura do Projeto

A estrutura do projeto é a seguinte:

```bash
  /src
    /assets           # Arquiovos adicionais do projeto
    /components       # Componentes do projeto
    /interfaces       # Interfaces do projeto
    /pages            # Páginas do projeto
    /services         # Serviços utilizados no projeto
    /styles           # Estilos do projeto
    App.tsx           # Componente raiz da aplicação
    main.tsx          # Ponto de entrada da aplicação
  /public
    /images
      /pokemons       # Imagens de cada pokémon
      /tipos          # Imagens de cada tipo
  index.html          # Arquivo HTML principal
  /eslint.json        # Configuração do ESLint
  /tsconfig.json      # Configuração do TypeScript
  /vercel.json        # Configuração da hospedagem da Vercel
  /vite.config.ts     # Arquivo de configuração do Vite com Typescript
  /package.json       # Dependências e scripts
```
## 🔧 Tecnologias

- React: Biblioteca para construção de interfaces de usuário.
- Vite: Ferramenta de build e bundling rápido.
- Typescript: Superset do JavaScript que adiciona tipagem estática opcional.
- Firebase: Plataforma com diversos recursos para projetos (neste projeto, foi utilizado o banco de dados NoSQL).

## 🔨 Configuração do TypeScript

- O TypeScript permite uma melhor estruturação e manutenção do código, com verificação de tipos em tempo de desenvolvimento. Se você não está familiarizado com TypeScript, recomendo que consulte a documentação oficial.
- O arquivo tsconfig.json está configurado para funcionar com React e Vite. A configuração padrão inclui jsx: "react-jsx", que é recomendada para projetos React com TypeScript.
