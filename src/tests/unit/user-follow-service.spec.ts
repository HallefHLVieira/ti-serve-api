import { InMemoryFollowersRepository } from '@/domain/repositories/in-memory/in-memory-followers-repository'
import { FollowerAlreadyExistsError } from '@/domain/use-cases/errors/followers-already-exists'
import { UserFollowServiceUseCase } from '@/domain/use-cases/user-follow-service'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryFollowersRepository: InMemoryFollowersRepository
let sut: UserFollowServiceUseCase

describe('User follow Service Use Case', () => {
  beforeEach(() => {
    inMemoryFollowersRepository = new InMemoryFollowersRepository()
    sut = new UserFollowServiceUseCase(inMemoryFollowersRepository)
  })

  it('should create a follow-action to a user and a service', async () => {
    expect.assertions(1)

    const { follower } = await sut.execute({
      userId: 'user-01',
      serviceId: 'service-01',
    })

    expect(follower.id).toBe(1)
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
    ).rejects.toBeInstanceOf(FollowerAlreadyExistsError)
  })
})
