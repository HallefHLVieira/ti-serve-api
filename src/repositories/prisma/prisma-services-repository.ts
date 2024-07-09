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

  async findById(serviceId: string): Promise<Service | null> {
    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
      },
    })

    return service
  }
}
