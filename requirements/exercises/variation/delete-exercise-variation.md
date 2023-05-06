# Deletar variação de exercício

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **DELETE** na rota **/api/exercises/{exercise_id}/variations/{variation_id}**
2. ⛔ Valida se a requisição foi feita por um usuário
3. ⛔ Valida os parâmetros **exercise_id** e **variation_id**
4. ⛔ **Deleta** uma variação de exercício caso exista mais de uma variação de exercício
5. ⛔ **Deleta** o exercício caso exista apenas uma variação de exercício
6. ⛔ Retorna **204**

> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ⛔ Retorna erro **403** se não for um usuário
3. ⛔ Retorna erro **403** se o exercise_id ou variation_id passado na URL for inválido
4. ⛔ Retorna erro **500** se der erro ao tentar deletar a variação de exercício
5. ⛔ Retorna erro **500** se der erro ao tentar deletar o exercício

### Rascunho

deleteExerciseVariation(exerciseId: string, variationId: string): void {
  await db.collection('exerciseVariations').deleteOne({
    exerciseId: ObjectId(exerciseId),
    _id: ObjectId(variationId)
  });
}

const result = await db.collection('exerciseVariations').deleteOne({
  exerciseId: ObjectId(exerciseId),
  _id: ObjectId(variationId)
})
