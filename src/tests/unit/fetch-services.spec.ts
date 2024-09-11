import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from '../../use-cases/service'
import { FetchServiceUseCase } from '../../use-cases/fetch-services'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'
import { InMemoryPhonesRepository } from '@/repositories/in-memory/in-memory-phones-repository'

let servicesRepository: InMemoryServicesRepository
let phonesRepository: InMemoryPhonesRepository

let sut: ServiceUseCase
let listSut: FetchServiceUseCase

describe('Service Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new ServiceUseCase(servicesRepository, phonesRepository)
    listSut = new FetchServiceUseCase(servicesRepository)
  })

  it('should be able see a empty list with active services', async () => {
    expect.assertions(1)

    await sut.execute({
      userId: 'user-01',
      name: 'Geek-frames',
      description: 'Loja de quadros decorativos.',
      street: 'Avenida Juarez Bender',
      number: '163',
      locationId: 1,
    })

    await sut.execute({
      userId: 'User-02',
      name: 'Mercadinho da Carol',
      description: 'Vende de tudo.',
      street: 'Avenida Juarez Bender',
      number: '155',
      locationId: 1,
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
      street: 'Rua 01',
      number: '100',
      locationId: 1,
    })

    await sut.execute({
      userId: 'User-02',
      name: 'Service-02',
      description: 'Descrição',
      street: 'Rua 02',
      number: '100',
      locationId: 1,
    })

    const servicesList = await listSut.execute()

    expect(servicesList).toEqual({ services: [] })
  })
})
