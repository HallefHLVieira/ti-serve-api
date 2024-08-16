import { Prisma, Follower } from '@prisma/client'

export interface IFollowersRepository {
  createOrUpdate(data: Prisma.FollowerUncheckedCreateInput): Promise<Follower>
  findByServiceAndUser(
    userId: string,
    serviceId: string,
  ): Promise<Follower | null>
  delete(userId: string, serviceId: string, liked: boolean): Promise<void>
}
