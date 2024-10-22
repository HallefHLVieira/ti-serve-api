import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { generateDownloadSignedUrl } from '@/scripts/downloadServiceBanner'

export async function downloadBannerController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const downloadBodySchema = z.object({
      key: z.string(),
    })

    const { key } = downloadBodySchema.parse(req.params)

    const signedUrl = await generateDownloadSignedUrl(key)

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
