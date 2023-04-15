# Criar exercício sugerido

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/exercises/suggestions**
2. ⛔ Valida se o usuário é **admin**
3. ✅ Valida dados obrigatórios **name**, **accountId**, **series**, **betweenSeriesTime**, **repetitions** e **repetitionTime**
3. ✅ **Cria** um exercício com os dados fornecidos
4. ✅ Retorna **201**, com os dados do exercício


> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se **name**, **accountId**, **series**, **betweenSeriesTime**, **repetitions** ou **repetitionTime** não forem fornecidos pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar o exercício