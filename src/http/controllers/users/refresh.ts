import { FastifyRequest, FastifyReply } from 'fastify'

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // Validando que o usuário está autenticado
    await request.jwtVerify({ onlyCookie: true })

    const { role } = request.user
    const token = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: request.user.sub,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '3d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: process.env.NODE_ENV !== 'production', // Usa HTTPS em produção
        sameSite: 'strict', // Ajuste conforme necessário
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    console.error('Error in refreshController:', error)
    return reply
      .status(500)
      .send({ message: `Internal server error ${error.message}` })
  }
}
