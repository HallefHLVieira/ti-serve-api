import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profiles (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/catalog-api/v1/users').send({
      name: 'Sivirino',
      password: '123456',
      phone: '12345678900',
      locationId: 1,
    })

    const authResponse = await request(app.server)
      .post('/catalog-api/v1/sessions')
      .send({
        password: '123456',
        phone: '12345678900',
      })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/catalog-api/v1/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        name: 'Sivirino',
      }),
    )
  })
})
