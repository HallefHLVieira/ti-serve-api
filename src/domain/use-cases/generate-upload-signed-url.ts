import { generateFileKey } from '@/scripts/fileKeyGenerator'
import { generateUploadSignedUrl } from '@/scripts/uploadServiceBanner'

export async function generateSignedUrlUseCase(
  name: string,
  contentType: string,
): Promise<{ fileKey: string; signedUrl: string }> {
  const fileKey = generateFileKey(name)

  const signedUrl = await generateUploadSignedUrl(fileKey, contentType)

  return { fileKey, signedUrl }
}
