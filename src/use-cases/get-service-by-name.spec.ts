import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from './service'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'
import { GetServiceByUserUseCase } from './get-service-by-name'

let servicesRepository: InMemoryServicesRepository
let sut: ServiceUseCase
let listSut: GetServiceByUserUseCase

describe('Get Services by Name Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new ServiceUseCase(servicesRepository)
    listSut = new GetServiceByUserUseCase(servicesRepository)
  })

  it('should be return a service when a correctly name', async () => {
    expect.assertions(1)

    const serviceName = 'Geek-frames'

    await sut.execute({
      userId: 'user-01',
      name: serviceName,
      description: 'Loja de quadros decorativos.',
      street: 'Avenida Juarez Bender',
      number: 163,
    })

    await sut.execute({
      userId: 'User-02',
      name: 'Mercadinho da Carol',
      description: 'Vende de tudo.',
      street: 'Avenida Juarez Bender',
      number: 155,
    })

    const { service } = await listSut.execute({ name: serviceName })

    expect(service?.name).toEqual(serviceName)
  })

  it('should be not return a service when a incorrectly name', async () => {
    expect.assertions(1)

    const serviceName = 'Geek-frames'

    await sut.execute({
      userId: 'user-01',
      name: serviceName,
      description: 'Loja de quadros decorativos.',
      street: 'Avenida Juarez Bender',
      number: 163,
    })

    const { service } = await listSut.execute({ name: 'Mercadinho da Carol' })

    expect(service).toEqual(null)
  })
})
