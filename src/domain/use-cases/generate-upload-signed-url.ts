import { generateFileKey } from '@/scripts/fileKeyGenerator'
import { generateSignedUrl } from '@/scripts/uploadService'

export async function generateSignedUrlUseCase(
  name: string,
  contentType: string,
): Promise<{ fileKey: string; signedUrl: string }> {
  const fileKey = generateFileKey(name)

  const signedUrl = await generateSignedUrl(fileKey, contentType)

  return { fileKey, signedUrl }
}
