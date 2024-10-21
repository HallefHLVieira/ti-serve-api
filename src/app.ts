import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { servicesRoutes } from './http/controllers/services/routes'
import { followersRoutes } from './http/controllers/follwers/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(
  async (app) => {
    app.register(usersRoutes)
    app.register(servicesRoutes)
    app.register(followersRoutes)
  },
  { prefix: '/catalog-api' },
)

app.get('/catalog-api/livenesscheck', () => ({
  service: 'services-catalog-api',
  healthy: true,
}))

// This is a global errors validation
app.setErrorHandler((error, _, replay) => {
  if (error instanceof ZodError) {
    return replay.status(400).send({
      message: 'Validation error.',
      issues: error.format,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like Datalog/NewRelic/Sentry
  }

  return replay.status(500).send({ message: 'Internal server error.' })
})
