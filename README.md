# ⭐ StarlistApp

O Starlist é uma lista de tarefas e agenda que tem tanto uma versão para navegadores como um app para celulares. Além disso, o Starlist pode ser usado tanto para tarefas individuais quanto para empresas que desejam montar um modelo por equipes.

## 📚 Índice

- [Sobre o projeto](#-starlistapp)
- [Tecnologias](#-com-o-que-foi-construído)
- [Instalação](#-instalação)
- [Uso](#-instrução-de-uso)
- [Licença](#-licença)

## 🔧 Tecnologias utilizadas

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&labelColor=20232A&logoColor=61DAFB&logo=react)&nbsp;&nbsp;
![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&labelColor=20232A&logoColor=61DAFB&logo=react)&nbsp;&nbsp;
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&labelColor=FFD43B&logoColor=3776AB&logo=python)&nbsp;&nbsp;
![BootStrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&labelColor=7952B3&logoColor=ffffff&logo=bootstrap)&nbsp;&nbsp;
![mySQL](https://img.shields.io/badge/mySQL-f29111?style=for-the-badge&labelColor=00758f&logoColor=000000&logo=mysql)&nbsp;&nbsp;
![Flask](https://img.shields.io/badge/Flask-fff?style=for-the-badge&logoColor=000&logo=flask)&nbsp;&nbsp;

## ⬇📦 Instalação

### 🖥️ Frontend
Após clonar o repositório, acesse:

```bash
cd frontend
```
Na pasta frontend, instale as dependências com:
```bash
npm install
```

### 🛠️ Backend
Após terminar a instalação, abra outro terminal e acesse:
```bash
cd backend
```
Na pasta backend, crie um ambiente virtual com:
```bash
python -m venv venv
```
Depois de instalado, ative o ambiente virtual com:
```bash
venv\Scripts\activate
```

### 💾 Banco de Dados

**Para instalar o banco de dados, você deve ter o XAMPP instalado**

Caso ainda não tenha, acesse: https://www.apachefriends.org/pt_br/index.html

Depois de instalado e aberto, ative as opções "Apache" e "MySQL".

Após ativar essas duas opções abra seu navegador e digite na barra de pesquisa: "localhost".

Ele irá abrir o menu do XAMPP e você deverá clicar em "phpMyAdmin".

Ao abrir o phpMyAdmin vá em "Novo" no lado superior esquerdo e crie um banco com nome de "starlist".

Depois de criar o banco, acesse ele e vá em "Importar".

No campo para selecionar o arquivo a ser importado, você deve selecionar o arquivo "starlist.sql" que está na pasta "banco" do projeto.

## 👨‍💻 Instrução de Uso

Após estar com tudo instalado, acesse novamente o seu terminal na pasta frontend e digite:
```bash
npm run dev
```
Depois de tudo carregado, acesse seu navegador e na barra de pequisa digite: http://localhost:5173.

Com isso, você já poderá ver a tela inicial do aplicativo.

No entanto, ainda precisamos rodar nosso backend para que tudo funcione corretamente:

Acesse seu terminal na pasta backend e com o ambiente virtual venv ativado (você verá escrito "(venv)" antes do caminho do arquivo no terminal) digite:
```bash
python app.py
```

⛔ ATENÇÃO! Ao executar esse comando, o Python irá mostrar uma URL no terminal semelhante a "http://10.0.0.100:8085". Acesse o arquivo "frontend/config.js" e veja se a URL da const BASE_URL é igual a fornecida no terminal. Caso seja diferente, copie a URL do terminal e cole na const BASE_URL.

**Agora sim, você pode usar o site normalmente! Tenha uma boa experiência.**

## 📄 Licença

Este projeto é proprietário e protegido por direitos autorais.  
O uso, cópia, modificação, redistribuição ou qualquer outra ação relacionada ao código-fonte deste repositório **não é permitida** sem autorização expressa do autor.

© 2025 Kaiky Augusto. Todos os direitos reservados.