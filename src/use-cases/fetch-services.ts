import type { Phone, Service } from '@prisma/client'
import { IServicesRepository } from '@/repositories/services-repository'
import { IPhonesRepository } from '@/repositories/phones-repository'

interface ServiceWithPhones extends Service {
  phones: Phone[]
}

interface ServiceUseCaseResponse {
  services: ServiceWithPhones[]
}

export class FetchServiceUseCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private phonesRepository: IPhonesRepository,
  ) {}

  async execute(): Promise<ServiceUseCaseResponse> {
    const services = await this.servicesRepository.listServices()

    if (services.length > 0) {
      const servicesWithPhone = await Promise.all(
        services.map(async (service): Promise<ServiceWithPhones> => {
          const phones = await this.phonesRepository.fetchByService(service.id)

          return {
            ...service,
            phones,
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
