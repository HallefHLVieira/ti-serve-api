import { hash } from 'bcryptjs'
import { IUsersRepository } from '@/repositories/users-repository'
import { UserAlreeadyExistsError } from './errors/user-already-exists'

interface RegisterUseCaseRequest {
  name: string
  password: string
  phone: string
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, password, phone }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 5)

    const userWithSamePhone = await this.usersRepository.findByPhone(phone)

    if (userWithSamePhone) {
      throw new UserAlreeadyExistsError()
    }

    this.usersRepository.create({
      name,
      password_hash,
      phone,
    })
  }
}
