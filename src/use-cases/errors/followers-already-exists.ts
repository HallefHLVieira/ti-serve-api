export class FollowerAlreadyExistsError extends Error {
  constructor() {
    super('Follower already exists.')
  }
}
