import { Prisma, Service } from '@prisma/client'
import { IServicesRepository } from '../services-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryServicesRepository implements IServicesRepository {
  public servicesTable: Service[] = []

  async findByname(name: string): Promise<Service | null> {
    const serviceAlreadyExists = await this.servicesTable.find(
      (item) => item.name === name,
    )
    return serviceAlreadyExists ?? null
  }

  async create(data: Prisma.ServiceUncheckedCreateInput) {
    const service = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      is_valid: data.is_valid ?? false,
      street: data.street,
      number: data.number,
      neighborhood: 'Benderville',
      zip_code: null,
      user_id: data.user_id,
      latitude: null,
      longitude: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }

    this.servicesTable.push(service)
    return service
  }
}
