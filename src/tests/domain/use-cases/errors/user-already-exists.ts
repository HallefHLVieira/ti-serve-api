export class UserAlreeadyExistsError extends Error {
  constructor() {
    super('Phone already exists.')
  }
}
