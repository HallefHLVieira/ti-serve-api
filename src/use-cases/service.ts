import type { Service } from '@prisma/client'
import { IServicesRepository } from '@/repositories/services-repository'
import { ServiceAlreadyExistsError } from './errors/service-already-exists'

interface ServiceUseCaseRequest {
  userId: string
  name: string
  street: string
  number: string
  description: string
  locationId: number
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
    locationId,
  }: ServiceUseCaseRequest): Promise<ServiceUseCaseResponse> {
    const serviceAlreadyExists = await this.servicesRepository.findByname(name)

    if (serviceAlreadyExists) {
      throw new ServiceAlreadyExistsError()
    }

    const service = await this.servicesRepository.create({
      user_id: userId,
      name,
      description,
      street,
      number,
      location_id: locationId,
    })

    return {
      service,
    }
  }
}
