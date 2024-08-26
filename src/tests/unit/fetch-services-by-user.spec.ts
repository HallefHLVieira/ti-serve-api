import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from '../../use-cases/service'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'
import { FetchServicesByUserUseCase } from '../../use-cases/fetch-services-by-user'

let servicesRepository: InMemoryServicesRepository
let sut: ServiceUseCase
let listSut: FetchServicesByUserUseCase

describe('Fetch Services by User Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new ServiceUseCase(servicesRepository)
    listSut = new FetchServicesByUserUseCase(servicesRepository)
  })

  it('should be return a list with one service by user', async () => {
    expect.assertions(1)

    const userId = 'user-01'

    await sut.execute({
      userId,
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

    const servicesList = await listSut.execute({ userId })

    expect(servicesList.services.length).toEqual(1)
  })
})
