import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from '../../use-cases/service'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'
import { ServiceAlreadyExistsError } from '../../use-cases/errors/service-already-exists'
import { InMemoryPhonesRepository } from '@/repositories/in-memory/in-memory-phones-repository'

let servicesRepository: InMemoryServicesRepository
let phonesRepository: InMemoryPhonesRepository
let sut: ServiceUseCase

describe('Service Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    phonesRepository = new InMemoryPhonesRepository()
    sut = new ServiceUseCase(servicesRepository, phonesRepository)
  })

  it('should be able to create a Service', async () => {
    expect.assertions(2)

    const { service, phonesSaved } = await sut.execute({
      userId: 'service-1',
      name: 'Geek Frames',
      description: 'Loja de quadros decorativos.',
      street: 'Avenida Juarez Bender',
      number: '163',
      locationId: 1,
      phones: [
        {
          number: '88988776655',
          isWhatsapp: true,
        },
      ],
    })
    expect(service.id).toEqual(expect.any(String))
    if (phonesSaved?.length) {
      expect(phonesSaved[0].id).toEqual(1)
    }
  })

  it('should be not able to create a Service with same name', async () => {
    expect.assertions(1)
    const serviceName = 'servie-01'

    await sut.execute({
      userId: 'service-1',
      name: serviceName,
      description: 'Loja de quadros decorativos.',
      street: 'Avenida Juarez Bender',
      number: '163',
      locationId: 1,
    })

    await expect(() =>
      sut.execute({
        userId: 'service-1',
        name: serviceName,
        description: 'Loja de quadros decorativos.',
        street: 'Avenida Juarez Bender',
        number: '163',
        locationId: 1,
      }),
    ).rejects.toBeInstanceOf(ServiceAlreadyExistsError)
  })
})
