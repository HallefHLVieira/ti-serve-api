import { hash } from 'bcryptjs'
import { IUsersRepository } from '@/tests/domain/repositories/users-repository'
import { UserAlreeadyExistsError } from './errors/user-already-exists'
import type { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  password: string
  phone: string
  locationId: number
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    password,
    phone,
    locationId,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 5)

    const userWithSamePhone = await this.usersRepository.findByPhone(phone)

    if (userWithSamePhone) {
      throw new UserAlreeadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      password_hash: passwordHash,
      phone,
      location_id: locationId,
    })

    return {
      user,
    }
  }
}
