import type { Service } from '@prisma/client'
import { IServicesRepository } from '@/repositories/services-repository'

interface ServiceUseCaseRequest {
  userId: string
  name: string
  street: string
  number: number
  description: string
}

interface ServiceUseCaseResponse {
  service: Service
}

export class ServiceUseCase {
  constructor(private servicesRepository: IServicesRepository) {}

  async execute({
    userId,
    name,
    street,
    number,
    description,
  }: ServiceUseCaseRequest): Promise<ServiceUseCaseResponse> {
    const service = await this.servicesRepository.create({
      user_id: userId,
      name,
      description,
      street,
      number,
    })

    return {
      service,
    }
  }
}
