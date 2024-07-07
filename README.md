# Catalog-api

Catalog style app

## Requisitos funcionais(RFs)
<!-- tudo que o usuário vai fazer -->
- [x] Deve ser possível se cadastrar como usuário;
- [x] Deve ser possível se autenticar como usuário;
- [ ] Deve ser possível obter o perfil de um usuário logado;
  
- [ ] Deve ser possível solicitar o cadasto do seu serviço;
- [ ] Deve ser possível visualizar os serviços cadastrados;
- [ ] Deve ser possível buscar um serviço pelo nome;
- [ ] Deve ser possível buscar/visualizar serviços próximos;

- [ ] Deve ser possível aprovar um cadastro de serviço;
- [ ] Deve ser possível avaliar os seviços;

## Regras de negócio(RNs)
<!-- sempre associado ao requisito funcional -->
- [x] O usuário não pode ter o mesmo número de celular de outra pessoa;
- [ ] Usuário não pode visualizar nada sem estar logado;
- [ ] Criação de serviços só pode ser aprovado por adms;

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