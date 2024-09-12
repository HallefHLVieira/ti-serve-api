import { FetchPhonesByServiceUseCase } from '../fetch-phones-by-service'
import { PrismaPhonesRepository } from '@/repositories/prisma/prisma-phones-repository'

export function makeFetchPhonesByServiceUseCase() {
  const phonesRepository = new PrismaPhonesRepository()
  const fetchPhonesByServiceUseCase = new FetchPhonesByServiceUseCase(
    phonesRepository,
  )

  return fetchPhonesByServiceUseCase
}
