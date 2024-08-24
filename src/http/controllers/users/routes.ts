import { FastifyInstance } from 'fastify'
import { registerController } from './register'
import { authenticateController } from './authenticate'
import { profileController } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refreshController } from './refresh'
import { updateProfileController } from './update-profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/v1/users', registerController)
  app.post('/v1/sessions', authenticateController)

  app.patch('/v1/token/refresh', refreshController)

  /** AUTHENTICATED ROUTES */
  app.get('/v1/me', { onRequest: [verifyJWT] }, profileController)
  app.patch(
    '/v1/users/profile/update',
    { onRequest: [verifyJWT] },
    updateProfileController,
  )
}
