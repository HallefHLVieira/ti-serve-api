import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from '../../use-cases/service'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'
import { GetServiceByIdUseCase } from '../../use-cases/get-service-by-id'

let servicesRepository: InMemoryServicesRepository
let sut: ServiceUseCase
let serviceSut: GetServiceByIdUseCase

describe('Get Services by Name Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new ServiceUseCase(servicesRepository)
    serviceSut = new GetServiceByIdUseCase(servicesRepository)
  })

  it('Should be able return a service by id with valid id', async () => {
    expect.assertions(1)

    const serviceName = 'Geek-frames'

    const resultSut = await sut.execute({
      userId: 'user-01',
      name: serviceName,
      description: 'Loja de quadros decorativos.',
      street: 'Avenida Juarez Bender',
      number: '163',
      locationId: 1,
    })

    const { service } = await serviceSut.execute({
      serviceId: resultSut.service.id,
    })

    expect(service?.id).toEqual(resultSut.service.id)
  })

  it('Should be not able return a service with invalid id', async () => {
    expect.assertions(1)

    const serviceName = 'Geek-frames'

    await sut.execute({
      userId: 'user-01',
      name: serviceName,
      description: 'Loja de quadros decorativos.',
      street: 'Avenida Juarez Bender',
      number: '163',
      locationId: 1,
    })

    const { service } = await serviceSut.execute({
      serviceId: 'invalid-id',
    })

    expect(service?.id).toEqual(undefined)
  })
})
