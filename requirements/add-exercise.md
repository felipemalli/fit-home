# Criar exercício

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/exercises**
2. ✅ Valida dados obrigatórios **name**, **totalTime**, **series**, **restBetweenSeriesTime**, **repetitions** and **repetitionTime**
3. ✅ **Cria** um exercício com os dados fornecidos
4. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se question ou answers não forem fornecidos pelo client
3. ✅ Retorna erro **500** se der erro ao tentar criar a enquete