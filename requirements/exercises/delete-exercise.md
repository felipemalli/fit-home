# Deleta exercício pelo seu id

### Rascunho

deleteExercise(exerciseId: string, isTemplate?: boolean): void {
  if (!isTemplate) {
    await exerciseCollection.deleteManyById(exerciseId)
  } else {
    await exerciseCollection.updateMany(templateId: exerciseId, 
      $unset: {
        templateId: ""
      }
    )
    await exerciseTemplateCollection.deleteManyById(exerciseId)
  }
}

a) Por padrão, deleta da collection dos exercícios.
b) Se for template, deleta da collection dos exercícios templates.
