# Catalog-api

Catalog style app

## Definition of Don
To eacth functionality, the DOR includes: Repository, use-case, factory, controller and route.


## Requisitos funcionais(RFs)
<!-- RF to Users -->
- [x] 1 - Deve ser possível se cadastrar;
- [x] 2 - Deve ser possível se autenticar;
- [x] 3 - Deve ser possível visualizar o próprio perfil;
- [x] 4 - Deve ser possível atualizar o próprio perfil;
- [x] 5 - Deve ser possível listar os próprios serviços;
- [x] 6 - Deve ser possível listar os serviços ativos;
- [ ] 7 - Deve ser possível cadastrar seu próprio serviço;
- [ ] 8 - Deve ser possível buscar um serviço pelo nome;
- [ ] 9 - Deve ser possível curtir um serviço;

<!-- Tudo que um usuário ADM pode fazer -->
- [ ] Deve ser possível visualizar os serviços que aguardam validação;
- [ ] Deve ser possível aprovar a ativação de um serviço;
- [ ] Deve ser possível um usuário ADM inativar qualquer serviço;

## Regras de negócio(RNs)
<!-- Sempre associado ao requisito funcional -->
- [x] O usuário não pode ter o mesmo número de celular de outra pessoa;
- [x] Todo usuário criado recebe o status de não verificado;
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