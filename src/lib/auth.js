// Utilidades de autenticación
export function generateToken(payload, expiresIn = '1h') {
  // Simulación de JWT - en producción usar una librería real
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  
  const now = Math.floor(Date.now() / 1000)
  let exp
  
  if (expiresIn === '1h') {
    exp = now + 3600
  } else if (expiresIn === '7d') {
    exp = now + 7 * 24 * 3600
  } else {
    exp = now + 3600
  }
  
  const payloadWithExp = { ...payload, exp, iat: now }
  const encodedPayload = btoa(JSON.stringify(payloadWithExp))
  
  // Simulación de firma (en producción usar HMAC real)
  const signature = btoa(`${header}.${encodedPayload}.secret`)
  
  return `${header}.${encodedPayload}.${signature}`
}

export function verifyToken(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Token inválido')
    }
    
    const payload = JSON.parse(atob(parts[1]))
    
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expirado')
    }
    
    return payload
  } catch (error) {
    throw new Error('Token inválido')
  }
}

export async function hashPassword(password) {
  // Simulación de hash - en producción usar bcrypt o similar
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password, hash) {
  const hashedInput = await hashPassword(password)
  return hashedInput === hash
}