import { makeFetchServicesByUserUseCase } from '@/domain/use-cases/factories/make-fetch-services-by-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function fetchServicesByUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchServicesByUserUseCase = makeFetchServicesByUserUseCase()

    const services = await fetchServicesByUserUseCase.execute({
      userId: request.user.sub,
    })
    return reply.status(200).send({
      services,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return reply.status(500).send({ message: err.message })
  }
}
