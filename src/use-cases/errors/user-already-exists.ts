export class UserAlreeadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
