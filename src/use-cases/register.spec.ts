import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreeadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', () => {
  it('should hash user password upan registration', async () => {
    expect.assertions(1)
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      phone: '99999999999',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register whit same phone twice', async () => {
    expect.assertions(1)
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const phone = '99999999999'

    await registerUseCase.execute({
      name: 'John Doe',
      phone,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        phone,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreeadyExistsError)
  })

  it('should be able to register', async () => {
    expect.assertions(1)
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      phone: '99999999999',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
