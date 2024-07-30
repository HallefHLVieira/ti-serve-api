import { prisma } from '@/lib/prisma'
import { Prisma, Service } from '@prisma/client'
import { IServicesRepository } from '../services-repository'

export class PrismaServicesRepository implements IServicesRepository {
  async create(data: Prisma.ServiceUncheckedCreateInput) {
    const service = await prisma.service.create({
      data,
    })
    return service
  }

  async findByname(name: string): Promise<Service | null> {
    const service = await prisma.service.findUnique({
      where: {
        name,
      },
    })
    return service
  }

  async listServices(): Promise<[] | Service[]> {
    const services = await prisma.service.findMany({
      where: {
        is_valid: true,
      },
      // select: {
      //   id: true,
      //   name: true,
      //   description: true,
      //   Phone: true,
      //   evaluations: true,
      // },
    })
    return services
  }

  async servicesByUser(userId: string): Promise<[] | Service[]> {
    const services = await prisma.service.findMany({
      where: {
        user_id: userId,
      },
    })
    return services
  }

  async serviceByName(name: string): Promise<Service | null> {
    const service = await prisma.service.findUnique({
      where: {
        name,
      },
    })
    return service
  }
}
