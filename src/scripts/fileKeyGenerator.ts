import { randomUUID } from 'crypto'

export function generateFileKey(name: string): string {
  return randomUUID().concat('-').concat(name)
}
