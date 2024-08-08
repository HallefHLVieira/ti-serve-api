import { expect, describe, it, beforeEach } from 'vitest'
import { UserFollowServiceUseCase } from './user-follow-service'
import { InMemoryEvaluationsRepository } from '../repositories/in-memory/in-memory-evaluations-repository'
import { EvaluationAlreadyExistsError } from './errors/evaluations-already-exists'

let inMemoryEvaluationsRepository: InMemoryEvaluationsRepository
let sut: UserFollowServiceUseCase

describe('User follow Service Use Case', () => {
  beforeEach(() => {
    inMemoryEvaluationsRepository = new InMemoryEvaluationsRepository()
    sut = new UserFollowServiceUseCase(inMemoryEvaluationsRepository)
  })

  it('should create a follow-action to a user and a service', async () => {
    expect.assertions(1)

    const { evaluation } = await sut.execute({
      userId: 'user-01',
      serviceId: 'service-01',
    })

    expect(evaluation.id).toBe(1)
  })

  it('should return error to create a follow-action duplicated', async () => {
    expect.assertions(1)

    await sut.execute({
      userId: 'user-01',
      serviceId: 'service-01',
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        serviceId: 'service-01',
      }),
    ).rejects.toBeInstanceOf(EvaluationAlreadyExistsError)
  })
})
