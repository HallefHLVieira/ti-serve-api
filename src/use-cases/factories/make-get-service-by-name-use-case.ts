import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository'
import { GetServiceByNameUseCase } from '../get-service-by-name'

export function makeGetServiceByNameUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const fetchServicesByUserUseCase = new GetServiceByNameUseCase(
    servicesRepository,
  )

  return fetchServicesByUserUseCase
}
