# Atualizar uma variação de exercício

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **PUT** na rota **/api/exercises/{exercise_id}/variations/{variation_id}**
2. ⛔ Valida se a requisição foi feita por um usuário
3. ⛔ Valida os parâmetros **exercise_id** e **variation_id** 
4. ⛔ **Atualiza** um exercício com os dados fornecidos
5. ⛔ Retorna **201** com os dados da variação de exercício

> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ⛔ Retorna erro **403** se não for um usuário
3. ⛔ Retorna erro **403** se o exercise_id ou variation_id passado na URL for inválido
4. ⛔ Retorna erro **500** se der erro ao tentar atualizar a variação de exercício

### Rascunho

updateExercise(exerciseId: string, newParameters: ?): void {
  await exerciseCollection.updateById(exerciseId, 
    $set: {
      newParameters
    }
  )
}
