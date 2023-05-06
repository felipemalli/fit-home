# Criar variação de exercício exercício

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **POST** na rota **/api/exercises/{exercise_id}/variations**
2. ⛔ Valida se a requisição foi feita por um usuário
3. ⛔ Valida dados obrigatórios **series**, **betweenSeriesTime**, **repetitions** e **repetitionTime**
4. ⛔ Valida o parâmetro **exercise_id** 
5. ⛔ **Cria** uma variação de exercício com os dados fornecidos no exercício escolhido
6. ⛔ Retorna **201** com os dados da variação de exercício


> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ⛔ Retorna erro **403** se não for um usuário
3. ⛔ Retorna erro **403** se o exercise_id passado na URL for inválido
4. ⛔ Retorna erro **400** se **series**, **betweenSeriesTime**, **repetitions** ou **repetitionTime** não forem fornecidos pelo client
5. ⛔ Retorna erro **500** se der erro ao tentar criar a variação do exercício


  series: number
  betweenSeriesTime: number
  repetitions: number
  repetitionTime: number
  warmupTime?: number
  weight?: number