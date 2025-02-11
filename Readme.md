# Projeto Docker com Backend e Frontend

Este projeto usa Docker para rodar o **backend** e o **frontend** em containers separados. O backend é uma API em FastAPI, e o frontend é uma aplicação Next.js.

### Estrutura do projeto

```bash
project/
│
├── backend/
│   └── Dockerfile
│   └── docker-compose.yml
│   └── ... (outros arquivos do backend)
│
├── rest-in/
│   └── Dockerfile
│   └── docker-compose.yml
│   └── ... (outros arquivos do frontend)
│
├── docker-compose.yml
└── README.md
```
## Como rodar o projeto

### Passos para rodar o backend

  1. Navegue até o diretório backend:
    
    cd backend

  2. Execute o comando para construir as imagens:

    docker-compose build

  3. Após a construção da imagem, inicie o container:

    docker-compose up

  4. O backend estará acessível em http://localhost:8000/.
  5. Para usar post get e get{id} pode usar http://localhost:8000/docs

### Passos para rodar o frontend (rest-in)

  1. Navegue até o diretório rest-in:

  ```bash
  cd ../rest-in
  ```
  2. Execute o comando para construir as imagens:

  ```bash
  docker-compose build
  ```
  3. Após a construção da imagem, inicie o container:

  ```bash
  docker-compose up
  ````
  4. O frontend estará acessível em http://localhost:3000/.


### Passos para rodar ambos os serviços ao mesmo tempo
  1. Para iniciar tanto o backend quanto o frontend simultaneamente, vá para o diretório raiz do projeto, onde está o docker-compose.yml principal:

  ```bash
  cd ..
  ```
  2. Execute o comando para construir as imagens:

  ```bash
  docker-compose up --build
  ```
  3. Após a construção, os containers serão iniciados e você poderá acessar o frontend no navegador em:
  http://localhost:3000/

  O backend estará disponível em http://localhost:8000/.

### Parando os containers
  Para parar os containers, execute o seguinte comando no diretório raiz do projeto:
  ```bash
  docker-compose down
  ```
  Isso irá parar e remover os containers em execução.
