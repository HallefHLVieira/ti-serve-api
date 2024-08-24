import { expect, describe, it, beforeEach } from 'vitest'
import { UserUnFollowServiceUseCase } from './user-unfollow-service'
import { InMemoryFollowersRepository } from '../repositories/in-memory/in-memory-followers-repository'
import { UserFollowServiceUseCase } from './user-follow-service'
import { FollowerNotExistsError } from './errors/followers-not-exists'

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

  it('should update a register follow to unfollow-action user for a service', async () => {
    expect.assertions(1)

    await expect(
      sutUnfollow.execute({
        userId: 'user-01',
        serviceId: 'service-01',
      }),
    ).rejects.toBeInstanceOf(FollowerNotExistsError)
  })
})
