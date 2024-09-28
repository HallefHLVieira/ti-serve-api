import { InMemoryFollowersRepository } from '@/domain/repositories/in-memory/in-memory-followers-repository'
import { InMemoryPhonesRepository } from '@/domain/repositories/in-memory/in-memory-phones-repository'
import { InMemoryServicesRepository } from '@/domain/repositories/in-memory/in-memory-services-repository'
import { FetchServiceUseCase } from '@/domain/use-cases/fetch-services'
import { ServiceUseCase } from '@/domain/use-cases/service'
import { expect, describe, it, beforeEach } from 'vitest'

let servicesRepository: InMemoryServicesRepository
let followersRepository: InMemoryFollowersRepository
let phonesRepository: InMemoryPhonesRepository

let sut: ServiceUseCase
let listSut: FetchServiceUseCase

describe('Service Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    followersRepository = new InMemoryFollowersRepository()
    phonesRepository = new InMemoryPhonesRepository()

    sut = new ServiceUseCase(servicesRepository, phonesRepository)
    listSut = new FetchServiceUseCase(servicesRepository, followersRepository)
  })

  it('should be able see a empty list with active services', async () => {
    expect.assertions(1)

    await sut.execute({
      userId: 'user-01',
      name: 'Service-01',
      description: 'Descrição',
      street: 'Rua-01',
      number: '100',
      locationId: 1,
      phones: [
        {
          number: '88988776655',
          isWhatsapp: true,
        },
      ],
    })

    await sut.execute({
      userId: 'User-02',
      name: 'Service-02',
      description: 'Descrição',
      street: 'Rua-02',
      number: '100',
      locationId: 1,
      phones: [
        {
          number: '88988776644',
          isWhatsapp: true,
        },
      ],
    })

    const servicesList = await listSut.execute()

    expect(servicesList).toEqual({ services: [] })
  })

  it('should be able see a empty list with active services', async () => {
    expect.assertions(1)

    await sut.execute({
      userId: 'user-01',
      name: 'Service-01',
      description: 'Descrição',
      street: 'Rua-01',
      number: '100',
      locationId: 1,
      phones: [
        {
          number: '88988776655',
          isWhatsapp: true,
        },
      ],
    })

    await sut.execute({
      userId: 'User-02',
      name: 'Service-02',
      description: 'Descrição',
      street: 'Rua-02',
      number: '100',
      locationId: 1,
      phones: [
        {
          number: '88988776644',
          isWhatsapp: true,
        },
      ],
    })

    const servicesList = await listSut.execute()

    expect(servicesList).toEqual({ services: [] })
  })
})
