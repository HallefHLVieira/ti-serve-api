import { Follower } from '@prisma/client'
import { IFollowersRepository } from '@/repositories/followers-repository'

interface FetchFollowersByServiceRequest {
  serviceId: string
}

interface FetchFollowersByServiceResponse {
  followers: Follower[] | []
}

export class GetFollowersByServiceUseCase {
  constructor(private followersRepository: IFollowersRepository) {}

  async execute({
    serviceId,
  }: FetchFollowersByServiceRequest): Promise<FetchFollowersByServiceResponse> {
    const followers = await this.followersRepository.findByService(serviceId)

    return { followers }
  }
}
