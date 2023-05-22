import { exerciseIdPath, exercisePath, loginPath, signUpPath } from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/exercises': exercisePath,
  '/exercises/{exerciseId}': exerciseIdPath
}
