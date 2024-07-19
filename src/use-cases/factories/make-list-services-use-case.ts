import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository'
import { ListServiceUseCase } from '../list-services'

export function makeCreateServiceUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const fetchServicesByUserUseCase = new ListServiceUseCase(servicesRepository)

  return fetchServicesByUserUseCase
}
