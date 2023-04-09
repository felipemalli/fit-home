# Criar exercício

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **POST** na rota **/api/exercises**
2. ⛔ Valida dados obrigatórios **name**, **totalTime**, **series**, **restBetweenSeriesTime**, **repetitions** e **repetitionTime**
3. ⛔ **Cria** um exercício com os dados fornecidos
4. ✅ Retorna **201**, com os dados do exercício


> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se **name**, **totalTime**, **series**, **restBetweenSeriesTime**, **repetitions** ou **repetitionTime** não forem fornecidos pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar o exercício