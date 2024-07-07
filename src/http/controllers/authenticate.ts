import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    password: z.string().min(6),
    phone: z.string().min(11),
  })

  const { password, phone } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({
      password,
      phone,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    // reply.status(500).send() // TODO: fix me
    throw err
  }

  return reply.status(200).send()
}
