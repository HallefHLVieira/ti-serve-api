import type { Service } from '@prisma/client'
import { IServicesRepository } from '@/repositories/services-repository'

interface ServiceUseCaseResponse {
  services: Service[]
}

export class ListServiceUseCase {
  constructor(private servicesRepository: IServicesRepository) {}

  async execute(): Promise<ServiceUseCaseResponse> {
    const services = await this.servicesRepository.listServices()

    return {
      services,
    }
  }
}
