# Catalog-api
This application is an online catalog of services available in one or more communities;

## Installing the app
1. Clone the project and install dependencies:
```bash
git clone git@github.com:catho/job-search.git
cd job-search
npm install
```
2. Create `.env` file based on `.env.example` and fill empty required parameters based on docker-compose.yml and env-example
```bash
cp .env.example .env
```
3. Run docker-composer to up docker-container with Postgres database:
```bash
docker-composer up -d
```  
4. Install database migrations:
```bash
npx prisma migrate dev
```
5. Install database seeders:
```bash
npx prisma db seed
```

### Start the aplication in local environment with NPM

* You must to have nodemon installed in global node_module
```bash
npm run start:dev
```

* Now just access: http://localhost:3000

### Tests

Run all tests once
```zsh
npm run test
```
Run only unit tests
```bash
npm test:unit
```
Run tests and generate the code coverage
```bash
npm run test:coverage
```

## Definitions of Read(ROR)
To eacth functionality, the tasks should inclues:
- Functional requirements ✔️
- Business roles ✔️
- Non-functional requirements ✔️

## Definitions of done(DOD)
To eacth functionality, the tasks should includes: 
- Repository-method ✔️
- use-case ✔️
- factory ✔️
- controller ✔️
- route ✔️

## Débito técnico
[] - Atualizar todos os repositórios que criam registros, implementando o método do prisma createOrUpdate. 

## Requisitos funcionais(RFs)
<!-- RF to Users -->
- [x] 1 - Deve ser possível se cadastrar como membro;
- [x] 2 - Deve ser possível se autenticar como membro;
- [x] 3 - Deve ser possível visualizar o próprio perfil;
- [x] 4 - Deve ser possível atualizar o próprio perfil;
- [x] 7 - Deve ser possível cadastrar seu próprio serviço;
- [x] 5 - Deve ser possível listar os próprios serviços;
- [x] 6 - Deve ser possível listar todos os serviços da comunidade;
- [x] 8 - Deve ser possível buscar um serviço pelo seu id;
- [x] 9 - Deve ser possível um membro gostar de um serviço;
- [ ] 10 - Deve ser possível um membro desgostar de um serviço;
- [ ] 11 - Deve ser possível um membro desativar sua conta;
- [ ] 12 - Deve ser possível um membro adicionar uma foto de perfil;
  
<!-- feats futuras -->
- [ ] Deve ser possível buscar um serviço pelo nome;
- [ ] Incluir foto para usuário
- [ ] Incluir foto/banner para o serviço

<!-- Tudo que um usuário ADM pode fazer -->
- [ ] Deve ser possível visualizar todos os membros que precisam ser verificados;
- [ ] Deve ser possível verificar um usuário;
- [ ] Deve ser possível visualizar os serviços que aguardam validação;
- [ ] Deve ser possível aprovar a ativação de um serviço;
- [ ] Deve ser possível um usuário ADM inativar qualquer serviço;

## Regras de negócio(RNs)
<!-- PARA RF 1 -->
- [x] Todo novo registro de usuário, deve ser criado com status de não verificado;
- [ ] A atualização do seu status de verificado só pode ser feita por um administrador;
- [ ] Um usuário não verificado não pode visualizar nenhum serviço da comunidade;
- [ ] Um usuário não verificado não pode criar nenhum serviço;
- [ ] Todo status de verificação só pode ser atualizado por um administrador;
- [ ] Todo processo de verificação, requer preenchimento de campos de identificação/localização
- [x] O usuário não pode ter o mesmo número de celular de outra pessoa;
  
  <!-- PARA RF 02-->
  <!-- PARA RF 03-->
  <!-- PARA RF 04-->
  <!-- PARA RF 05-->
  <!-- PARA RF 06-->
  <!-- PARA RF 07-->
  <!-- PARA RF 08-->
  <!-- PARA RF 09-->
  <!-- PARA RF 10-->

- [x] Todas as ações chamadas pelo user devem ser authenticadas com o token jwt
- [ ] Apenas usuários ADM's pode verificar os usuários recém criados;
- [ ] Usuário não pode visualizar nada sem estar logado;
- [ ] O login inicialmente possuirá um time de 20 minutos para expirar;
- [x] Não pode haver serviço com nome duplicado;
- [ ] Criação de serviços só pode ser aprovado por adms;
- [ ] Usuário não pode curtir um serviço mais de uma vez;

## Requisitos não funcionais(RFNs)
<!-- não parte do cliente -->
- [x] Senhas dos users precisam ter no mínimo 6 caracteres;
- [x] Senhas dos users precisam estar criptografadas;
- [x] Os dados da aplicação precisam persistir em um banco PostgreSQL;
- [x] O user deve ser ideentificado por meio de um JWT;

## To developer
- VS-code min version: 1.89

## Patterns utilizados
- Repository
- Factory
- Sut