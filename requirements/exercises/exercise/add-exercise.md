# Criar exercício

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/exercises**
2. ✅ Valida se a requisição foi feita por um usuário
2. ✅ Valida dados obrigatórios **name**, **accountId**, **series**, **betweenSeriesTime**, **repetitions** e **repetitionTime**
3. ✅ **Cria** um exercício com os dados fornecidos
4. ✅ Retorna **201** com os dados do exercício


> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário
3. ✅ Retorna erro **400** se **name**, **accountId**, **series**, **betweenSeriesTime**, **repetitions** ou **repetitionTime** não forem fornecidos pelo client
4. ✅ Retorna erro **500** se der erro ao tentar criar o exercício

### Rascunho

addExercise(exercise, isTemplate?) {
  if (isTemplate) {
    const exerciseCollection = await MongoHelper.getCollection('exercise-templates')
    await exerciseCollection.insertOne(exercise)
  } else {
    const exerciseCollection = await MongoHelper.getCollection('exercises')
    await exerciseCollection.insertOne(exercise)
  }
}
