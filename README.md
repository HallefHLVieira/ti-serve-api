# Catalog-api

Catalog style app

## Requisitos funcionais(RFs)
<!-- tudo que o usuário vai fazer -->
- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível visualizar os serviços do bairro;
- [ ] Deve ser possível solicitar o cadasto do seu serviço;
- [ ] Deve ser possível buscar serviços próximos;
- [ ] Deve ser possível buscar um serviço pelo nome;
- [ ] Deve ser possível aprovar um cadastro de serviço;
- [ ] Deve ser possível visualizar os dados de um serviço;
- [ ] Deve ser possível avaliar os seviços;

## Regras de negócio(RNs)
<!-- sempre associado ao requisito funcional -->
- [ ] O usuário não pode ter e-mail duplicado;
- [ ] Usuário não pode visualizar nada sem estar logado;
- [ ] Criação de serviços só pode ser aprovado por adms;

## Requisitos não funcionais(RFNs)
<!-- não parte do cliente -->
- [] Senhas dos users precisam estar criptografadas
- [] Os dados da aplicação precisam persistir em um banco PostgreSQL;
- [] O user deve ser ideentificado por meio de um JWT

## To developer
- VS-code min version: 1.89