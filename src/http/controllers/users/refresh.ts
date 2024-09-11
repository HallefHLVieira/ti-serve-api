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
        // secure: true, // encriptado pelo https
        sameSite: true, // acessível dentro do site apenas
        httpOnly: true, // apenas o backend acessa o valor do cookie
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
