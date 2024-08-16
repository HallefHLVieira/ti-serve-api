import type { Follower } from '@prisma/client'
import { IFollowersRepository } from '@/repositories/followers-repository'
import { FollowerAlreadyExistsError } from './errors/followers-already-exists'

interface FollowUseCaseRequest {
  userId: string
  serviceId: string
}

interface FollowUseCaseResponse {
  follower: Follower
}

export class UserFollowServiceUseCase {
  constructor(private followersRepository: IFollowersRepository) {}

  async execute({
    userId,
    serviceId,
  }: FollowUseCaseRequest): Promise<FollowUseCaseResponse> {
    const followerAlreadyExists =
      await this.followersRepository.findByServiceAndUser(userId, serviceId)

    if (followerAlreadyExists) {
      throw new FollowerAlreadyExistsError()
    }

    const follower = await this.followersRepository.createOrUpdate({
      user_id: userId,
      service_id: serviceId,
    })

    return {
      follower,
    }
  }
}
