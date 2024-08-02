import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository'
import { GetServiceByIdUseCase } from '../get-service-by-id'

export function makeGetServiceByIdUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const fetchServiceByIdUseCase = new GetServiceByIdUseCase(servicesRepository)

  return fetchServiceByIdUseCase
}
