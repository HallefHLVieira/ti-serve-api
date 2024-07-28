export class InvalidPhoneToUpdateError extends Error {
  constructor() {
    super('Phone already exists.')
  }
}
