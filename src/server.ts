import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server is running 🚀️')
    if (env.NODE_ENV === 'dev') {
      console.log(`http://localhost:${env.PORT}`)
    }
  })
