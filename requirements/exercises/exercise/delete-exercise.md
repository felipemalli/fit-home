# Deletar exercício pelo seu id

> ## Caso de sucesso

1. ⛔ Recebe uma requisição do tipo **DELETE** na rota **/api/exercises/{exercise_id}**
2. ⛔ Valida se a requisição foi feita por um usuário
3. ⛔ Valida o parâmetro **exercise_id**
4. ⛔ **Deleta** um exercício
5. ⛔ Retorna **204**

> ## Exceções

1. ⛔ Retorna erro **404** se a API não existir
2. ⛔ Retorna erro **403** se não for um usuário
3. ⛔ Retorna erro **403** se o exercise_id passado na URL for inválido
4. ⛔ Retorna erro **500** se der erro ao tentar deletar o exercício

### Rascunho

deleteExercise(exerciseId: string, isTemplate?: boolean, deleteRelatedExercises?: boolean): void {
  if (isTemplate) {
    await exerciseTemplateCollection.deleteById(exerciseId);
    if (deleteRelatedExercises) {
      await exerciseCollection.deleteMany(templateId: exerciseId);
      return;
    }
    await exerciseCollection.updateMany(templateId: exerciseId, {$unset: {templateId: ""}});
    return;
  }
  await exerciseCollection.deleteById(exerciseId);
}
}

a) Por padrão, deleta o exercício.
b) Se for template, deleta o template e atualiza ou deleta os exercícios relacionados.
