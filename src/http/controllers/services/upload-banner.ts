import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { generateSignedUrl } from '@/domain/use-cases/upload-generate-signed-url'

const prisma = new PrismaClient()

export async function uploadBannerController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Data validation
    const uploadBodySchema = z.object({
      name: z.string().min(1),
      contentType: z.string().regex(/\w+\/[-+.\w]+/),
    })

    const uploadParamsSchema = z.object({
      id: z.string(),
    })

    const { name, contentType } = uploadBodySchema.parse(req.body)
    const { id } = uploadParamsSchema.parse(req.params)

    const { fileKey, signedUrl } = await generateSignedUrl(name, contentType)

    const updatedServiceData = { banner_key: fileKey }

    await prisma.service.update({
      where: { id },
      data: updatedServiceData,
    })

    return { url: signedUrl }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Prisma code error to resource not found
    if (err.code === 'P2025') {
      reply.status(404).send({ message: 'Service not found.' })
    } else {
      reply.status(500).send({ message: err.message })
    }
  }
}
