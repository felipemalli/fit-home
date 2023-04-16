# Carrega exercícios pelo accountId

### Rascunho

loadExercises(accountId: string): ExerciseModel[] {
  const exercises = await exerciseCollection.findManyById(accountId)
  return exercises
}
