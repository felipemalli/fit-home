# Atualizar um exercício

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **PUT** na rota **/api/exercises/{exercise_id}**
2. ⛔ Valida se a requisição foi feita por um usuário
3. ⛔ Valida o parâmetro **exercise_id**
4. ⛔ **Atualiza** um exercício com os dados fornecidos
5. ⛔ Retorna **200** com os dados do exercício

> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ⛔ Retorna erro **403** se não for um usuário
3. ⛔ Retorna erro **403** se o exercise_id passado na URL for inválido
4. ⛔ Retorna erro **500** se der erro ao tentar atualizar o exercício

### Rascunho

updateExercise(exerciseId: string, newParameters: ?): void {
  await exerciseCollection.updateById(exerciseId, 
    $set: {
      newParameters
    }
  )
}

Atualiza o name, description e/ou isTemplate
