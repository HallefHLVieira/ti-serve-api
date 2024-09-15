import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services-repository'
import { GetServiceByIdUseCase } from '../get-service-by-id'
import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'
import { PrismaFollowersRepository } from '@/repositories/prisma/prisma.followers-repository'

export function makeGetServiceByIdUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const phonesRepository = new PrismaPhonesRepository()
  const followersRepository = new PrismaFollowersRepository()

  const fetchServiceByIdUseCase = new GetServiceByIdUseCase(
    servicesRepository,
    phonesRepository,
    followersRepository,
  )

  return fetchServiceByIdUseCase
}
