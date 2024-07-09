import { Prisma, Service } from '@prisma/client'

export interface IServicesRepository {
  create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service>
  // findById(serviceId: string): Promise<Service | null>
}
