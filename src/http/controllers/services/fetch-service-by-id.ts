import { makeFetchFollowersByServiceUseCase } from '@/use-cases/factories/make-fetch-followers-by-service-use-case'
import { makeFetchPhonesByServiceUseCase } from '@/use-cases/factories/make-fetch-phones-by-service-use-case'
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
    const { service } = await fetchServiceByIdUseCase.execute({
      serviceId,
    })

    const fetchPhonesByServiceUseCase = makeFetchPhonesByServiceUseCase()
    const { phones } = await fetchPhonesByServiceUseCase.execute({ serviceId })

    const fetchLikesByService = makeFetchFollowersByServiceUseCase()
    const { followers } = await fetchLikesByService.execute({ serviceId })

    return reply
      .status(200)
      .send({ ...service, phones, likes: followers.length })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return reply.status(500).send({ message: err.message })
  }
}
