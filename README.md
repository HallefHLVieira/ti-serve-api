# Catalog-api

Catalog style app

## Requisitos funcionais(RFs)
<!-- Tudo que o usuário poderá fazer no sistema -->
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível visualizar o próprio perfil;
- [ ] Deve ser possível atualizar os dados do perfil;
- [ ] Deve ser possível listar os serviços cadastrados;  
- [x] Deve ser possível um usuário cadastrar seu próprio serviço;
- [ ] Deve ser possível um usuário listar os próprios serviços;
- [ ] Deve ser possível buscar um serviço pelo nome;
- [ ] Deve ser possível um usuário ADM visualizar os serviços que aguardam ativação;
- [ ] Deve ser possível um usuário ADM aprovar a criação de um serviço;
- [ ] Deve ser possível um usuário dar like para um seviço;

<!-- Funções em backlogs -->
- [ ] Deve ser possível filtrar os serviços próximos por distância;

## Regras de negócio(RNs)
<!-- Sempre associado ao requisito funcional -->
- [x] O usuário não pode ter o mesmo número de celular de outra pessoa;
- [ ] Todo usuário criado recebe o status de não verificado;
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
- [ ] O user deve ser ideentificado por meio de um JWT;

## To developer
- VS-code min version: 1.89

## Patterns utilizados
- Repository
- Factory
- Sut