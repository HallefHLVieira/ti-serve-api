import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'

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

  const password_hash = await hash(password, 5)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return reply.status(409).send('User already exist!')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password_hash,
    },
  })

  return reply.status(201).send()
}
