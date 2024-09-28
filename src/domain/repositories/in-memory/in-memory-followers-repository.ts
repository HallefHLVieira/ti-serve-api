import { Follower, Prisma } from '@prisma/client'
import { IFollowersRepository } from '../followers-repository'
import { FollowersNotFoundError } from '@/domain/use-cases/errors/followers-not-found'

export class InMemoryFollowersRepository implements IFollowersRepository {
  public followersTable: Follower[] = []

  async createOrUpdate(data: Prisma.FollowerUncheckedCreateInput) {
    const follower = {
      id: 1,
      user_id: data.user_id,
      service_id: data.service_id,
      liked: data.liked ?? false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }
    this.followersTable.push(follower)
    return follower
  }

  async delete(userId: string, serviceId: string): Promise<void> {
    const followersIndex = this.followersTable.findIndex(
      (item) => item.service_id === serviceId && item.user_id === userId,
    )
    if (followersIndex < 0) {
      throw new FollowersNotFoundError()
    }
    this.followersTable.splice(followersIndex, 1)
  }

  async findByServiceAndUser(
    userId: string,
    serviceId: string,
  ): Promise<Follower | null> {
    const followersIndex = this.followersTable.findIndex(
      (item) =>
        item.service_id === serviceId &&
        item.user_id === userId &&
        item.deleted_at === null,
    )
    if (followersIndex < 0) {
      return null
    }
    return this.followersTable[followersIndex]
  }

  async findByService(serviceId: string): Promise<
    | {
        id: number
        liked: boolean
        created_at: Date
        updated_at: Date
        deleted_at: Date | null
        user_id: string
        service_id: string
      }[]
    | []
  > {
    const followers = await this.followersTable.filter(
      (like) => like.service_id === serviceId && like.liked === true,
    )

    return followers
  }
}
