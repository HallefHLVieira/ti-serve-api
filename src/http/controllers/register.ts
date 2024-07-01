import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
    phone: z.string().min(11),
  })

  const { name, email, password, phone } = registerBodySchema.parse(
    request.body,
  )

  try {
    await registerUseCase({
      name,
      email,
      password,
      phone,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
