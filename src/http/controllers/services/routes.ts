import { FastifyInstance } from 'fastify'
import { createServiceController } from '../services/service'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function servicesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/services', createServiceController)
}
