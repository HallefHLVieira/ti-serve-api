import { makeGetServiceByIdUseCase } from '@/use-cases/factories/make-get-service-by-id-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function fetchServicesByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getServiceByIdParamsSchema = z.object({
      serviceId: z.string(),
    })
    const { serviceId } = getServiceByIdParamsSchema.parse(request.params)
    const fetchServiceByIdUseCase = makeGetServiceByIdUseCase()
    const service = await fetchServiceByIdUseCase.execute({
      serviceId,
    })

    return reply.status(200).send(service)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return reply.status(500).send({ message: err.message })
  }
}
