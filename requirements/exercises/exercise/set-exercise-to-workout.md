# Definir a conexão de um exercício à uma série

### Rascunho

setExerciseToWorkout(exerciseId: string, workoutId?: string): void {
  if (workoutId) {
    await exerciseCollection.updateById(exerciseId, 
      $set: {
        workoutId
      }
    )
  } else {
    await exerciseCollection.updateById(exerciseId, {
      $unset: {
        workoutId: 1
      }
    });
  }
}
