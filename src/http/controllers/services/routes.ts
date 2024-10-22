import { FastifyInstance } from 'fastify'
import { createServiceController } from '../services/service'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetchServicesController } from './fetch-services'
import { fetchServicesByUserController } from './fetch-services-by-user'
import { fetchServicesByIdController } from './fetch-service-by-id'
import { uploadBannerController } from './upload-banner'
import { downloadBannerController } from './download-banner'
// import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function servicesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post(
    '/v1/services',
    // { onRequest: [verifyUserRole('ADMIN')] },
    createServiceController,
  )

  app.post('/v1/services/:id/banner', uploadBannerController)
  app.get('/v1/services/banner/:key', downloadBannerController)
  app.get('/v1/services', fetchServicesController)
  app.get('/v1/services/user', fetchServicesByUserController)
  app.get('/v1/services/:serviceId', fetchServicesByIdController)
}
