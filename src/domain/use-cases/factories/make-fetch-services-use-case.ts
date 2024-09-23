import { PrismaServicesRepository } from '@/tests/domain/repositories/prisma/prisma-services-repository'
import { FetchServiceUseCase } from '../fetch-services'
import { PrismaFollowersRepository } from '@/repositories/prisma/prisma.followers-repository'

export function makeFetchServicesUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const followersRepository = new PrismaFollowersRepository()

  const fetchServicesByUserUseCase = new FetchServiceUseCase(
    servicesRepository,
    followersRepository,
  )

  return fetchServicesByUserUseCase
}
