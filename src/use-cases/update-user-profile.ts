import { IUsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface UpdateUserProfileUseCaseRequest {
  userId: string
  data: {
    name: string
    phone: string
  }
}

interface UpdateUserProfileUseCaseResponse {
  user: User
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
    data,
  }: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
    const user = await this.usersRepository.updateProfile(userId, data)

    if (!user) {
      throw new Error('Error to update user-profile.')
    }

    return {
      user,
    }
  }
}
