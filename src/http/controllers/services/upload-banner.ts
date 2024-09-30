import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { randomUUID } from 'node:crypto'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2 } from '@/lib/cloudfare'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function uploadBannerController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const uploadBodySchema = z.object({
      name: z.string().min(1),
      contentType: z.string().regex(/\w+\/[-+.\w]+/),
    })

    const uploadParamsSchema = z.object({
      id: z.string(),
    })

    const { name, contentType } = uploadBodySchema.parse(req.body)
    const { id } = uploadParamsSchema.parse(req.params)

    const fileKey = randomUUID().concat('-').concat(name)

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: 'tiserve-dev',
        Key: fileKey,
        ContentType: contentType,
      }),
      { expiresIn: 300 },
    )

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
