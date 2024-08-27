import type { Follower } from '@prisma/client'
import { IFollowersRepository } from '@/repositories/followers-repository'
import { FollowerNotExistsError } from './errors/followers-not-exists'

interface UnFollowUseCaseRequest {
  userId: string
  serviceId: string
}

interface UnFollowUseCaseResponse {
  follower: Follower
}

export class UserUnFollowServiceUseCase {
  constructor(private followersRepository: IFollowersRepository) {}

  async execute({
    userId,
    serviceId,
  }: UnFollowUseCaseRequest): Promise<UnFollowUseCaseResponse> {
    const follower = await this.followersRepository.createOrUpdate({
      user_id: userId,
      service_id: serviceId,
      liked: false,
    })

    return {
      follower,
    }
  }
}
