//Configurando o JWT para autenticação de usuarios.

export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'default_secret'
    exp: '1h', // Tempo de expiração do token
    algorithm: 'HS256' // Algoritmo de assinatura
}