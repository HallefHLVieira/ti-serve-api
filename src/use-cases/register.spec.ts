import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upan registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByPhone(phone) {
        return null
      },

      // TODO: não retornar dados desnecessários
      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          phone: data.phone,
          password_hash: data.password_hash,
          is_valid: false,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        }
      },
    })

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
})
