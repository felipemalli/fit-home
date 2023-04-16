# Atualiza uma série

### Rascunho

updateWorkout(workoutId: string, newParameters: ?): void {
  await workoutCollection.updateById(workoutId, 
    $set: {
      newParameters
    }
  )
}
