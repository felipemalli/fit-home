# Deleta workout e exercícios

### Rascunho

deleteWorkout(workoutId) {
  await exerciseCollection.deleteMany(workoutId, isFavorite: false, !templateId)
  await exerciseCollection.updateMany(workoutId,
    $or: [{
      isFavorite: true
    }, {
      templateId: { $exists: true }
    }],
    {
      $unset: {
        workoutId: ""
      }
    }
  await workoutCollection.deleteById(workoutId)
}

- Deleta workout e exercícios não favoritos e sem templateId
- Remove workoutId dos exercícios favoritos ou com templateId
