# Atualiza um exercício

### Rascunho

updateExercise(exerciseId: string, newParameters: ?): void {
  await exerciseCollection.updateById(exerciseId, 
    $set: {
      newParameters
    }
  )
}
