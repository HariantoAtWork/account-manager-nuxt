import { connectToDatabase } from '../utils/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = await connectToDatabase()
  const users = db.collection('users')

  const user = await users.findOne({ email: body.email })

  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    throw createError({
      statusCode: 401,
      message: 'Invalid email or password',
    })
  }

  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' })

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      additionalEmails: user.additionalEmails || [],
    },
  }
})