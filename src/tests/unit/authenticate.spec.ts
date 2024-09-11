import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '../../use-cases/authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../../use-cases/errors/invalid-credentials-error'

// sut = system under test ou variável principal que está sendo testada

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate', async () => {
    expect.assertions(1)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      phone: '88999887755',
      password_hash: await hash('123456', 5),
      location_id: 1,
    })

    const { user } = await sut.execute({
      phone: '88999887755',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong phone', async () => {
    expect.assertions(1)

    expect(() =>
      sut.execute({
        phone: '88999887755',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    expect.assertions(1)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      phone: '88999887755',
      password_hash: await hash('123456', 5),
      location_id: 1,
    })

    expect(() =>
      sut.execute({
        phone: '88999887755',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
