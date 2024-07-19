import type { Service } from '@prisma/client'
import { IServicesRepository } from '@/repositories/services-repository'

interface FetchServicesByUserRequest {
  name: string
}

interface FetchServicesByUserResponse {
  service: Service | null
}

export class GetServiceByNameUseCase {
  constructor(private servicesRepository: IServicesRepository) {}

  async execute({
    name,
  }: FetchServicesByUserRequest): Promise<FetchServicesByUserResponse> {
    const service = await this.servicesRepository.serviceByName(name)

    return {
      service,
    }
  }
}
