import { connectToDatabase } from '../utils/db'
import { getUserIdFromToken } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = await connectToDatabase()
  const users = db.collection('users')

  const userId = await getUserIdFromToken(event)
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  const result = await users.updateOne(
    { _id: userId },
    { $set: { name: body.name } }
  )

  if (result.modifiedCount === 0) {
    throw createError({
      statusCode: 400,
      message: 'Failed to update profile',
    })
  }

  const updatedUser = await users.findOne({ _id: userId })
  return {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    additionalEmails: updatedUser.additionalEmails || [],
  }
})