import type { Service } from '@prisma/client'
import { IServicesRepository } from '@/repositories/services-repository'

interface FetchServiceByIdRequest {
  serviceId: string
}

interface FetchServiceByIdResponse {
  service: Service | null
}

export class GetServiceByIdUseCase {
  constructor(private servicesRepository: IServicesRepository) {}

  async execute({
    serviceId,
  }: FetchServiceByIdRequest): Promise<FetchServiceByIdResponse> {
    const service = await this.servicesRepository.serviceById(serviceId)

    return {
      service,
    }
  }
}
