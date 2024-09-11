import { FastifyRequest, FastifyReply } from 'fastify'

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Validando que o usuário está autenticado
  await request.jwtVerify({ onlyCookie: true }) // Não olha para o cabeçalho da request, olha apenas para os cookies e verifica se há um refreshToken

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
      secure: false, // encriptado pelo https
      sameSite: true, // acessível dentro do site apenas
      httpOnly: true, // apenas o backend acessa o valor do cookie
    })
    .status(200)
    .send({ token })
}
