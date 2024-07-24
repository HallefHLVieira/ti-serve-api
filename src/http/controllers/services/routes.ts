import { FastifyInstance } from 'fastify'
import { createServiceController } from '../services/service'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function servicesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/services',
    { onRequest: [verifyUserRole('ADMIN')] },
    createServiceController,
  )
}
