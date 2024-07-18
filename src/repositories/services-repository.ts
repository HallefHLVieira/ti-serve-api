import { Prisma, Service } from '@prisma/client'

export interface IServicesRepository {
  create(data: Prisma.ServiceUncheckedCreateInput): Promise<Service>
  findByname(name: string): Promise<Service | null>
  listServices(): Promise<Service[] | []>
  servicesByUser(userId: string): Promise<Service[] | []>
  serviceByName(name: string): Promise<Service | null>
}
