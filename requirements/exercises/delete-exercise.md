# Deleta exercício pelo seu id

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
