export class EvaluationAlreadyExistsError extends Error {
  constructor() {
    super('Evaluations already exists.')
  }
}
