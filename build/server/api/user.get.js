import { connectToDatabase } from '../utils/db'
import { getUserIdFromToken } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const db = await connectToDatabase()
  const users = db.collection('users')

  const userId = await getUserIdFromToken(event)
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const user = await users.findOne({ _id: userId })
  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    additionalEmails: user.additionalEmails || [],
  }
})