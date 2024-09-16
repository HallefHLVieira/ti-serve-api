import { expect, describe, it, beforeEach } from 'vitest'
import { UserUnFollowServiceUseCase } from '../domain/use-cases/user-unfollow-service'
import { InMemoryFollowersRepository } from '../domain/repositories/in-memory/in-memory-followers-repository'
import { UserFollowServiceUseCase } from '../domain/use-cases/user-follow-service'
import { FollowerNotExistsError } from '../domain/use-cases/errors/followers-not-exists'

let inMemoryFollowersRepository: InMemoryFollowersRepository
let sutUnfollow: UserUnFollowServiceUseCase
let sutFollow: UserFollowServiceUseCase

describe('User unfollow Service Use Case', () => {
  beforeEach(() => {
    inMemoryFollowersRepository = new InMemoryFollowersRepository()
    sutUnfollow = new UserUnFollowServiceUseCase(inMemoryFollowersRepository)
    sutFollow = new UserFollowServiceUseCase(inMemoryFollowersRepository)
  })

  it('should update a register follow to unfollow-action user for a service', async () => {
    expect.assertions(1)

    await sutFollow.execute({
      userId: 'user-01',
      serviceId: 'service-01',
    })

    const { follower } = await sutUnfollow.execute({
      userId: 'user-01',
      serviceId: 'service-01',
    })

    expect(follower.liked).toBe(false)
  })
})
