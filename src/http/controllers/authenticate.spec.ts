import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/catalog-api/v1/users').send({
      name: 'Sivirino',
      password: '123456',
      phone: '12345678900',
      locationId: 1,
    })

    const response = await request(app.server)
      .post('/catalog-api/v1/sessions')
      .send({
        password: '123456',
        phone: '12345678900',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
