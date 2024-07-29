import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchServicesUseCase } from '@/use-cases/factories/make-fetch-services-use-case'

export async function fetchServicesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchServicesUseCase = makeFetchServicesUseCase()

    const services = await fetchServicesUseCase.execute()
    return reply.status(200).send({
      services,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return reply.status(500).send({ message: err.message })
  }
}
