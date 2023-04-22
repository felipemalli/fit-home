# Carrega exercícios do usuário

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **GET** na rota **/api/exercises**
2. ⛔ Valida se a requisição foi feita por um usuário
3. ⛔ Recebe o accountId do request para filtrar os exercícios
4. ⛔ Retorna **200** com exercícios criados pelo usuário


> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ⛔ Retorna erro **403** se não for um usuário
3. ⛔ Retorna erro **500** se der erro ao tentar listar exercícios

### Rascunho

loadExercises(accountId: string): ExerciseModel[] {
  const exercises = await exerciseCollection.findManyById(accountId)
  return exercises
}
