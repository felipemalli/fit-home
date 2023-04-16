# Carrega séries pelo accountId

### Rascunho

loadExercises(accountId: string): WorkoutModel[] {
  const workouts = await workoutCollection.findManyById(accountId)
  return workouts
}
