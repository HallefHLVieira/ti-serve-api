import type { Service } from '@prisma/client'
import { IServicesRepository } from '@/tests/domain/repositories/services-repository'

interface FetchServicesByUserRequest {
  userId: string
}

interface FetchServicesByUserResponse {
  services: Service[]
}

export class FetchServicesByUserUseCase {
  constructor(private servicesRepository: IServicesRepository) {}

  async execute({
    userId,
  }: FetchServicesByUserRequest): Promise<FetchServicesByUserResponse> {
    const services = await this.servicesRepository.servicesByUser(userId)

    return {
      services,
    }
  }
}
