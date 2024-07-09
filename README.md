# Catalog-api

Catalog style app

## Requisitos funcionais(RFs)
<!-- tudo que o usuário vai fazer -->
- [x] Deve ser possível se cadastrar como usuário;
- [x] Deve ser possível se autenticar como usuário;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível atualizar os dados do perfil;
  
- [x] Deve ser possível cadastrar um serviço;
- [] Deve ser possível visualizar os serviços ativos;
- [] Deve ser possível visualizar os serviços que aguardam ativação;
- [] Deve ser possível buscar um serviço pelo nome;
- [] Deve ser possível ativar um serviço
- [] Deve ser possível buscar/visualizar serviços próximos;

- [] Deve ser possível um usuário dar like para um seviço;

## Regras de negócio(RNs)
<!-- sempre associado ao requisito funcional -->
- [x] O usuário não pode ter o mesmo número de celular de outra pessoa;
- [] Usuário não pode visualizar nada sem estar logado;
- [] Criação de serviços só pode ser aprovado por adms;
- [] Usuário não pode curtir um serviço mais de uma vez;

## Requisitos não funcionais(RFNs)
<!-- não parte do cliente -->
- [x] Senhas dos users precisam estar criptografadas
- [x] Os dados da aplicação precisam persistir em um banco PostgreSQL;
- [] O user deve ser ideentificado por meio de um JWT

## To developer
- VS-code min version: 1.89


## Patterns utilizados
- Repository
- Factory
- Sut