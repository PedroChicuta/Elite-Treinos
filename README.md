## Elite Treinos

Sistema completo para gestão de treinos personalizados, desenvolvido para facilitar a rotina de alunos e personal trainers. A aplicação permite criar, organizar e acompanhar programas de treino, promovendo uma experiência eficiente e intuitiva.

---

## Tecnologias Utilizadas

### Backend

* PHP 8.4
* Laravel 12
* Laravel Sanctum (autenticação)
* Composer

### Frontend

* Node.js 24
* React 19
* React Router
* Tailwind CSS
* Prettier

---

## Instalação e Configuração

### Backend

```bash
cp .env.example .env
composer install
php artisan key:generate
```

Configure o banco de dados no arquivo `.env` e depois execute:

```bash
php artisan migrate
php artisan db:seed
php artisan serve
```

---

### Frontend

```bash
npm install
npm run dev
```

---

## Credenciais de Acesso (Ambiente de Desenvolvimento)

> Estas credenciais são apenas para testes locais

**Aluno**

* Email: [aluno1@app.com](mailto:aluno1@app.com)
* Senha: password

**Personal Trainer**

* Email: [personal1@app.com](mailto:personal1@app.com)
* Senha: password

**Super Administrador**

* Email: [superadmin@app.com](mailto:superadmin@app.com)
* Senha: password

---

## Arquitetura e Decisões Técnicas

### Backend

* Estrutura baseada no padrão MVC do Laravel
* Foco em simplicidade e manutenção (evitando over-engineering)
* API RESTful seguindo boas práticas
* Autenticação com Laravel Sanctum utilizando cookies HttpOnly

### Frontend

* Componentização baseada em responsabilidade única
* Separação entre lógica e interface
* Gerenciamento de rotas com React Router
* Estilização com Tailwind CSS

---

## API Endpoints

A API está disponível a partir do prefixo:

```
/api
```

### Autenticação

* `POST /login` → Realiza login
* `POST /logout` → Realiza logout
* `GET /me` → Retorna o usuário autenticado

---

### Alunos

* `GET /alunos` → Lista todos os alunos
* `POST /alunos` → Cria um novo aluno
* `PUT /alunos/:id` → Atualiza um aluno
* `DELETE /alunos/:id` → Remove um aluno
* `GET /alunos/:id/treinos` → Lista treinos do aluno
* `POST /alunos/:id/treinos` → Adiciona treino ao aluno
* `DELETE /alunos/:id/treinos/:id` → Remove treino do aluno

---

###  Personais (Trainers)

* `GET /trainers` → Lista todos os personais
* `POST /trainers` → Cria um novo personal
* `PUT /trainers/:id` → Atualiza um personal
* `DELETE /trainers/:id` → Remove um personal
* `GET /trainers/:id/alunos` → Lista alunos do personal

---

### Treinos

* `GET /treinos` → Lista todos os treinos
* `POST /treinos` → Cria um treino
* `DELETE /treinos/:id` → Remove um treino

---

## Autenticação

A autenticação foi implementada com **Laravel Sanctum**, utilizando cookies HttpOnly para gerenciar sessões de forma segura.

* O login cria uma sessão autenticada no servidor
* O cookie é armazenado no cliente de forma segura
* As rotas protegidas exigem autenticação prévia
