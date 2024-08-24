export class FollowerNotExistsError extends Error {
  constructor() {
    super('Follower not exists.')
  }
}
