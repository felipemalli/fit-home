# Listar exercícios sugeridos

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **GET** na rota **/api/exercises/suggestions**
2. ⛔ Recebe uma query string opcional com o parâmetro **page**
2. ⛔ Valida se a requisição foi feita por um usuário
3. ⛔ Retorna **200** com exercícios da primeira página sem a query string
4. ⛔ Retorna **200** com exercícios da página definida pela query string **page**


> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ⛔ Retorna erro **403** se não for um usuário
3. ⛔ Retorna erro **500** se der erro ao tentar listar exercícios