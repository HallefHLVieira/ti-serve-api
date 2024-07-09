import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from './service'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'

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
})
