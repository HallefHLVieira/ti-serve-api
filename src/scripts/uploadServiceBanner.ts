import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/cloudfare'
import { env } from 'process'

export async function generateUploadSignedUrl(
  fileKey: string,
  contentType: string,
): Promise<string> {
  return await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: fileKey,
      ContentType: contentType,
    }),
    { expiresIn: 300 },
  )
}
