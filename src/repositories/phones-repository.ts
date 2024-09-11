import { Prisma, Phone } from '@prisma/client'

export interface IPhonesRepository {
  create(data: Prisma.PhoneUncheckedCreateInput): Promise<Phone>
}
