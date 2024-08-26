import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from '../../use-cases/get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../../use-cases/errors/resource-not-found-error'

// sut = system under test ou variável principal que está sendo testada

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able get an user profile', async () => {
    expect.assertions(2)

    const createUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      phone: '99999999999',
      password_hash: await hash('123456', 5),
      location_id: 1,
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able get an user profile with wrong id', async () => {
    expect.assertions(1)

    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
