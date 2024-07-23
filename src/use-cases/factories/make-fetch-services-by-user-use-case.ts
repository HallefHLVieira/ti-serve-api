import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository'
import { FetchServicesByUserUseCase } from '../fetch-services-by-user'

export function makeFetchServicesByUserUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const fetchServicesByUserUseCase = new FetchServicesByUserUseCase(
    servicesRepository,
  )

  return fetchServicesByUserUseCase
}
