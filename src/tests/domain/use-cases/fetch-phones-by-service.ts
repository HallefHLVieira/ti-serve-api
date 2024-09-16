import { Phone } from '@prisma/client'
import { IPhonesRepository } from '@/tests/domain/repositories/phones-repository'

interface FetchPhonesByServiceRequest {
  serviceId: string
}

interface FetchPhonesByServiceResponse {
  phones: Phone[]
}

export class FetchPhonesByServiceUseCase {
  constructor(private phonesRepository: IPhonesRepository) {}

  async execute({
    serviceId,
  }: FetchPhonesByServiceRequest): Promise<FetchPhonesByServiceResponse> {
    const phones = await this.phonesRepository.fetchByService(serviceId)

    return { phones }
  }
}
