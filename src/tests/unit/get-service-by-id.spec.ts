import { expect, describe, it, beforeEach } from 'vitest'
import { ServiceUseCase } from '../../use-cases/service'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services-repository'
import { GetServiceByIdUseCase } from '../../use-cases/get-service-by-id'
import { InMemoryPhonesRepository } from '@/repositories/in-memory/in-memory-phones-repository'

let servicesRepository: InMemoryServicesRepository
let phonesRepository: InMemoryPhonesRepository
let sut: ServiceUseCase
let serviceSut: GetServiceByIdUseCase

describe('Get Services by Name Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    phonesRepository = new InMemoryPhonesRepository()

    sut = new ServiceUseCase(servicesRepository, phonesRepository)
    serviceSut = new GetServiceByIdUseCase(servicesRepository)
  })

  it('Should be able return a service by id with valid id', async () => {
    expect.assertions(1)

    const serviceName = 'Serviço-01'

    const resultSut = await sut.execute({
      userId: 'user-01',
      name: serviceName,
      description: 'Descrição',
      street: 'Rua-01',
      number: '100',
      locationId: 1,
    })

    const { service } = await serviceSut.execute({
      serviceId: resultSut.service.id,
    })

    expect(service?.id).toEqual(resultSut.service.id)
  })

  it('Should be not able return a service with invalid id', async () => {
    expect.assertions(1)

    const serviceName = 'Serviço-01'

    await sut.execute({
      userId: 'user-01',
      name: serviceName,
      description: 'Descrição',
      street: 'Rua-01',
      number: '100',
      locationId: 1,
    })

    const { service } = await serviceSut.execute({
      serviceId: 'invalid-id',
    })

    expect(service?.id).toEqual(undefined)
  })
})
