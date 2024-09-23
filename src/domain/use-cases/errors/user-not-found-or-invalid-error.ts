export class UserNotFoundOrInvalidError extends Error {
  constructor() {
    super('User not found or is invalid.')
  }
}
