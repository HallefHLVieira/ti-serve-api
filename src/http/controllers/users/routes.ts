import { FastifyInstance } from 'fastify'
import { registerController } from './register'
import { authenticateController } from './authenticate'
import { profileController } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refreshController } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshController)

  /** AUTHENTICATED ROUTES */
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
