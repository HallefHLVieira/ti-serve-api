import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository'
import { FetchServiceUseCase } from '../fetch-services'
import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'

export function makeFetchServicesUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const phonesRepository = new PrismaPhonesRepository()

  const fetchServicesByUserUseCase = new FetchServiceUseCase(
    servicesRepository,
    phonesRepository,
  )

  return fetchServicesByUserUseCase
}
