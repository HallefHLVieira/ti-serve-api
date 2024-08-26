import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from '../../use-cases/service'
import { FetchServiceUseCase } from '../../use-cases/fetch-services'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'

let servicesRepository: InMemoryServicesRepository
let sut: ServiceUseCase
let listSut: FetchServiceUseCase

describe('Service Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new ServiceUseCase(servicesRepository)
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
})
