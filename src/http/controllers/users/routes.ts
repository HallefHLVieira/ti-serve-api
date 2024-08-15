import { FastifyInstance } from 'fastify'
import { registerController } from './register'
import { authenticateController } from './authenticate'
import { profileController } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refreshController } from './refresh'
import { updateProfileController } from './update-profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/v1/sessions', authenticateController)

  app.patch('/token/refresh', refreshController)

  /** AUTHENTICATED ROUTES */
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
  app.patch(
    '/users/profile/update',
    { onRequest: [verifyJWT] },
    updateProfileController,
  )
}
