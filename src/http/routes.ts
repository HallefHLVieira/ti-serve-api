import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticateController } from './controllers/authenticate'
import { createServiceController } from './controllers/service'
import { profile } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticateController)

  app.post('/services', createServiceController)

  app.get('/me', profile)
}
