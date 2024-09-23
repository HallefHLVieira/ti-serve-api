export class FollowersNotFoundError extends Error {
  constructor() {
    super('Followers not found.')
  }
}
