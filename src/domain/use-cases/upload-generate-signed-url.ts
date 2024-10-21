import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/cloudfare'
import { env } from 'process'

export async function generateSignedUrl(
  name: string,
  contentType: string,
): Promise<{ fileKey: string; signedUrl: string }> {
  const fileKey = randomUUID().concat('-').concat(name)

  const signedUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: fileKey,
      ContentType: contentType,
    }),
    { expiresIn: 300 },
  )

  return { fileKey, signedUrl }
}
