# Criar série

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **POST** na rota **/api/workouts**
2. ⛔ Valida dados obrigatórios **accountId**, **name**, **betweenExercisesTime**
3. ⛔ **Cria** uma série com os dados fornecidos
4. ⛔ Retorna **201**, com os dados da série


> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ⛔ Retorna erro **400** se **accountId**, **name**, **betweenExercisesTime** não forem fornecidos pelo client
3. ⛔ Retorna erro **500** se der erro ao tentar criar a série