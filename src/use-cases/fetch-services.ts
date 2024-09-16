import type { Service } from '@prisma/client'
import { IServicesRepository } from '@/repositories/services-repository'
import { IFollowersRepository } from '@/repositories/followers-repository'

interface ServiceWithPhones extends Service {
  likes: number
}

interface ServiceUseCaseResponse {
  services: ServiceWithPhones[]
}

export class FetchServiceUseCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private followersRepository: IFollowersRepository,
  ) {}

  async execute(): Promise<ServiceUseCaseResponse> {
    const services = await this.servicesRepository.listServices()

    if (services.length > 0) {
      const servicesWithPhone = await Promise.all(
        services.map(async (service): Promise<ServiceWithPhones> => {
          const followers = await this.followersRepository.findByService(
            service.id,
          )

          return {
            ...service,
            likes: followers.length,
          }
        }),
      )
      return { services: servicesWithPhone }
    }
    return {
      services: [],
    }
  }
}
