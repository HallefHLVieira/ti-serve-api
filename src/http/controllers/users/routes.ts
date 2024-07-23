import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticateController } from './authenticate'
import { profileController } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  // Create user account
  app.post('/users', register)
  // Do login
  app.post('/sessions', authenticateController)

  /** AUTHENTICATED ROUTES */

  // Get self profile
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
