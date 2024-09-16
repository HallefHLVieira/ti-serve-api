import { Phone, Service } from '@prisma/client'
import { IServicesRepository } from '@/tests/domain/repositories/services-repository'
import { IPhonesRepository } from '@/tests/domain/repositories/phones-repository'
import { IFollowersRepository } from '@/tests/domain/repositories/followers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchServiceByIdRequest {
  serviceId: string
}

interface FetchServiceByIdResponse extends Service {
  phones: Phone[]
  likes: number
}

export class GetServiceByIdUseCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private phonesRepository: IPhonesRepository,
    private followersRepository: IFollowersRepository,
  ) {}

  async execute({
    serviceId,
  }: FetchServiceByIdRequest): Promise<FetchServiceByIdResponse | null> {
    const service = await this.servicesRepository.serviceById(serviceId)

    if (service) {
      const phones = await this.phonesRepository.fetchByService(serviceId)
      const followers = await this.followersRepository.findByService(serviceId)

      return { ...service, phones, likes: followers.length }
    }

    throw new ResourceNotFoundError()
  }
}
