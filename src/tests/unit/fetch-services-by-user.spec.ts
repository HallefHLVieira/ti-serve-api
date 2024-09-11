import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from '../../use-cases/service'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'
import { FetchServicesByUserUseCase } from '../../use-cases/fetch-services-by-user'
import { InMemoryPhonesRepository } from '@/repositories/in-memory/in-memory-phones-repository'

let servicesRepository: InMemoryServicesRepository
let phonesRepository: InMemoryPhonesRepository
let sut: ServiceUseCase
let listSut: FetchServicesByUserUseCase

describe('Fetch Services by User Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    phonesRepository = new InMemoryPhonesRepository()

    sut = new ServiceUseCase(servicesRepository, phonesRepository)
    listSut = new FetchServicesByUserUseCase(servicesRepository)
  })

  it('should be return a list with one service by user', async () => {
    expect.assertions(1)

    const userId = 'user-01'

    await sut.execute({
      userId,
      name: 'Service-01',
      description: 'Descrição',
      street: 'Rua-01',
      number: '100',
      locationId: 1,
    })

    await sut.execute({
      userId: 'User-02',
      name: 'Service-02',
      description: 'Descrição',
      street: 'Rua-02',
      number: '100',
      locationId: 1,
    })

    const servicesList = await listSut.execute({ userId })

    expect(servicesList.services.length).toEqual(1)
  })
})
