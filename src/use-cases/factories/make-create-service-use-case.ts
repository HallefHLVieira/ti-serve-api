import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository'
import { ServiceUseCase } from '../service'
import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'

export function makeCreateServiceUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const phonesRepository = new PrismaPhonesRepository()

  const createServiceUseCase = new ServiceUseCase(
    servicesRepository,
    phonesRepository,
  )

  return createServiceUseCase
}
