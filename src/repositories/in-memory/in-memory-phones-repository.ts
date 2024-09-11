import { Prisma, Phone } from '@prisma/client'
import { IPhonesRepository } from '../phones-repository'

export class InMemoryPhonesRepository implements IPhonesRepository {
  public phonesTable: Phone[] = []

  async create(data: Prisma.PhoneUncheckedCreateInput): Promise<Phone> {
    const phone = {
      id: 1,
      number: data.number,
      is_whatsapp: data.is_whatsapp ?? false,
      service_id: data.service_id,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }
    this.phonesTable.push(phone)
    return phone
  }

  async fetchByService(serviceId: string): Promise<Phone[] | []> {
    const phones: Phone[] = this.phonesTable.filter(
      (phone) => phone.service_id === serviceId,
    )

    return phones
  }
}
