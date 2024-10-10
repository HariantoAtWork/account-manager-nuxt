import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export function getUserIdFromToken(event) {
  const token = getTokenFromHeader(event)
  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded.userId
  } catch (error) {
    console.error('Invalid token:', error)
    return null
  }
}

function getTokenFromHeader(event) {
  const authHeader = event.node.req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}