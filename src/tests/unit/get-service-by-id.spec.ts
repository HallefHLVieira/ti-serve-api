import { InMemoryFollowersRepository } from '@/domain/repositories/in-memory/in-memory-followers-repository'
import { InMemoryPhonesRepository } from '@/domain/repositories/in-memory/in-memory-phones-repository'
import { InMemoryServicesRepository } from '@/domain/repositories/in-memory/in-memory-services-repository'
import { ResourceNotFoundError } from '@/domain/use-cases/errors/resource-not-found-error'
import { GetServiceByIdUseCase } from '@/domain/use-cases/get-service-by-id'
import { ServiceUseCase } from '@/domain/use-cases/service'
import { expect, describe, it, beforeEach } from 'vitest'

let servicesRepository: InMemoryServicesRepository
let phonesRepository: InMemoryPhonesRepository
let followersRepository: InMemoryFollowersRepository

let sut: ServiceUseCase
let serviceSut: GetServiceByIdUseCase

describe('Get Services by Name Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    phonesRepository = new InMemoryPhonesRepository()
    followersRepository = new InMemoryFollowersRepository()

    sut = new ServiceUseCase(servicesRepository, phonesRepository)
    serviceSut = new GetServiceByIdUseCase(
      servicesRepository,
      phonesRepository,
      followersRepository,
    )
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

    const service = await serviceSut.execute({
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

    await expect(() =>
      serviceSut.execute({
        serviceId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
