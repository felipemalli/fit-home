# Definir o favorito de um exercício

### Rascunho

Exemplo:

setExerciseFavorite(exerciseId: string, isFavorite: boolean): void {
  await exerciseCollection.updateById(exerciseId, 
    $set: {
      isFavorite
    }
  )
}
