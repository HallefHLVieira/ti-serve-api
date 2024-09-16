import type { Phone, Service } from '@prisma/client'
import { IServicesRepository } from '@/tests/domain/repositories/services-repository'
import { ServiceAlreadyExistsError } from './errors/service-already-exists'
import { IPhonesRepository } from '@/tests/domain/repositories/phones-repository'

interface Phones {
  number: string
  isWhatsapp: boolean
}
interface ServiceUseCaseRequest {
  userId: string
  name: string
  street: string
  number: string
  description: string
  locationId: number
  phones?: Phones[]
}

interface ServiceUseCaseResponse {
  service: Service
  phonesSaved: Phone[] | []
}

export class ServiceUseCase {
  constructor(
    private servicesRepository: IServicesRepository,
    private phonesRepository: IPhonesRepository,
  ) {}

  async execute({
    userId,
    name,
    street,
    number,
    description,
    locationId,
    phones,
  }: ServiceUseCaseRequest): Promise<ServiceUseCaseResponse> {
    const serviceAlreadyExists = await this.servicesRepository.findByname(name)
    const phonesSaved: Phone[] = []

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

    if (service && phones?.length) {
      await Promise.all(
        phones.map(async (phone) => {
          const phoneSaved = await this.phonesRepository.create({
            number: phone.number,
            is_whatsapp: phone.isWhatsapp,
            service_id: service.id,
          })

          if (phoneSaved) {
            phonesSaved.push(phoneSaved)
          }
        }),
      )
    }

    if (phonesSaved.length > 0) {
      return {
        service,
        phonesSaved,
      }
    }

    return {
      service,
      phonesSaved: [],
    }
  }
}
