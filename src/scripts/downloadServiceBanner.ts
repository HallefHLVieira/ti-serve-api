import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/cloudfare'
import { env } from 'process'

export async function generateDownloadSignedUrl(key: string): Promise<string> {
  return await getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 300 },
  )
}
