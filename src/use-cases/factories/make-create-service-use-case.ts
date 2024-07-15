import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository'
import { ServiceUseCase } from '../service'

export function makeCreateServiceUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const createServiceUseCase = new ServiceUseCase(servicesRepository)

  return createServiceUseCase
}
