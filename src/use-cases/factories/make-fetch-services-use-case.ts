import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository'
import { FetchServiceUseCase } from '../fetch-services'

export function makeFetchServicesUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const fetchServicesByUserUseCase = new FetchServiceUseCase(servicesRepository)

  return fetchServicesByUserUseCase
}
