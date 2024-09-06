import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchServicesUseCase } from '@/use-cases/factories/make-fetch-services-use-case'
import { makeFetchFollowersByServiceUseCase } from '@/use-cases/factories/make-fetch-followers-by-service-use-case'

export async function fetchServicesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchServicesUseCase = makeFetchServicesUseCase()
    const fetchFollowersByServiceUseCase = makeFetchFollowersByServiceUseCase()

    const { services } = await fetchServicesUseCase.execute()

    const updatedServices = await Promise.all(
      services.map(async (service) => {
        const { followers } = await fetchFollowersByServiceUseCase.execute({
          serviceId: service.id,
        })

        const likes = {
          likes: followers.length,
        }

        return Object.assign(service, likes)
      }),
    )

    return reply.status(200).send({
      updatedServices,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return reply.status(500).send({ message: err.message })
  }
}
