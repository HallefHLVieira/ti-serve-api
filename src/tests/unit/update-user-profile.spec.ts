import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/domain/repositories/in-memory/in-memory-users-repository'
import { UpdateUserProfileUseCase } from '@/domain/use-cases/update-user-profile'
import { InvalidPhoneToUpdateError } from '@/domain/use-cases/errors/invalid-phone-to-update-error'
import { UserNotFoundOrInvalidError } from '@/domain/use-cases/errors/user-not-found-or-invalid-error'

// sut = system under test ou variável principal que está sendo testada

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: UpdateUserProfileUseCase

describe('Update an user-profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able update an user-profile', async () => {
    expect.assertions(3)

    const createUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      phone: '99999999999',
      password_hash: await hash('123456', 5),
      location_id: 1,
    })

    const { user } = await sut.execute({
      userId: createUser.id,
      data: {
        name: 'John Does',
        phone: '88888888888',
      },
    })

    expect(user.id).toEqual(createUser.id)
    expect(user.name).toEqual('John Does')
    expect(user.phone).toEqual('88888888888')
  })

  it('should be not able update an user-profile with already exists phone', async () => {
    expect.assertions(1)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      phone: '99999999999',
      password_hash: await hash('123456', 5),
      location_id: 1,
    })

    await inMemoryUsersRepository.create({
      name: 'John Does',
      phone: '88888888888',
      password_hash: await hash('123456', 5),
      location_id: 1,
    })

    expect(() =>
      sut.execute({
        userId: 'user-01',
        data: {
          name: 'John Does',
          phone: '88888888888',
        },
      }),
    ).rejects.toBeInstanceOf(InvalidPhoneToUpdateError)
  })

  it('should be not able update an user-profile with user id fake or invalid', async () => {
    expect.assertions(1)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      phone: '99999999999',
      password_hash: await hash('123456', 5),
      location_id: 1,
    })

    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
        data: {
          name: 'John Does',
          phone: '88888888888',
        },
      }),
    ).rejects.toBeInstanceOf(UserNotFoundOrInvalidError)
  })
})
