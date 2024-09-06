import { prisma } from '@/lib/prisma'
import { Follower, Prisma } from '@prisma/client'
import { IFollowersRepository } from '../followers-repository'
import { FollowersNotFoundError } from '../../use-cases/errors/followers-not-found'

export class PrismaFollowersRepository implements IFollowersRepository {
  async createOrUpdate(
    data: Prisma.FollowerUncheckedCreateInput,
  ): Promise<Follower> {
    const follower = await prisma.follower.findFirst({
      where: {
        service_id: data.service_id,
        user_id: data.user_id,
      },
    })

    if (!follower) {
      const registerFollower = await prisma.follower.create({
        data,
      })
      return registerFollower
    }

    if (follower.liked === false) {
      follower.liked = !follower.liked
      follower.updated_at = new Date()

      await prisma.follower.update({
        where: {
          id: follower.id,
        },
        data: {
          ...follower,
        },
      })

      return follower
    } else {
      follower.liked = !follower.liked
      follower.updated_at = new Date()

      await prisma.follower.update({
        where: {
          id: follower.id,
        },
        data: {
          ...follower,
        },
      })

      return follower
    }
  }

  async findByServiceAndUser(
    userId: string,
    serviceId: string,
  ): Promise<Follower | null> {
    const follower = await prisma.follower.findFirst({
      where: {
        service_id: serviceId,
        user_id: userId,
        deleted_at: null,
      },
    })

    if (follower === null) {
      return null
    }
    return follower
  }

  async findByService(serviceId: string): Promise<Follower[] | []> {
    const followers = await prisma.follower.findMany({
      where: {
        service_id: serviceId,
        liked: true,
      },
    })

    if (followers === null) {
      return []
    }
    return followers
  }

  async delete(userId: string, serviceId: string): Promise<void> {
    const follower = await prisma.follower.findFirst({
      where: {
        service_id: serviceId,
        user_id: userId,
        deleted_at: null,
        liked: true,
      },
    })

    if (!follower) {
      throw new FollowersNotFoundError()
    }

    follower.deleted_at = new Date()
    follower.liked = false

    await prisma.follower.update({
      where: {
        id: follower.id,
      },
      data: { ...follower },
    })
  }
}
