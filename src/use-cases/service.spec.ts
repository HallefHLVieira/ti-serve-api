import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from './service'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'
import { ServiceAlreadyExistsError } from './errors/service-already-exists'

let servicesRepository: InMemoryServicesRepository
let sut: ServiceUseCase

describe('Service Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new ServiceUseCase(servicesRepository)
  })

  it('should be able to create a Service', async () => {
    expect.assertions(1)

    const { service } = await sut.execute({
      userId: 'service-1',
      name: 'Geek Frames',
      description: 'Loja de quadros decorativos.',
      street: 'Avenida Juarez Bender',
      number: 163,
    })

    expect(service.id).toEqual(expect.any(String))
  })

  it('should be not able to create a Service with same name', async () => {
    expect.assertions(1)
    const serviceName = 'servie-01'

    await sut.execute({
      userId: 'service-1',
      name: serviceName,
      description: 'Loja de quadros decorativos.',
      street: 'Avenida Juarez Bender',
      number: 163,
    })

    await expect(() =>
      sut.execute({
        userId: 'service-1',
        name: serviceName,
        description: 'Loja de quadros decorativos.',
        street: 'Avenida Juarez Bender',
        number: 163,
      }),
    ).rejects.toBeInstanceOf(ServiceAlreadyExistsError)
  })
})
