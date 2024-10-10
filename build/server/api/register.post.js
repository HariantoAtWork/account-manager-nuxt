import { connectToDatabase } from '../utils/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = await connectToDatabase()
  const users = db.collection('users')

  const existingUser = await users.findOne({ email: body.email })
  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: 'Email already in use',
    })
  }

  const hashedPassword = await bcrypt.hash(body.password, 10)
  const newUser = {
    name: body.name,
    email: body.email,
    password: hashedPassword,
    additionalEmails: [],
  }

  const result = await users.insertOne(newUser)
  const token = jwt.sign({ userId: result.insertedId }, 'your-secret-key', { expiresIn: '1h' })

  return {
    token,
    user: {
      id: result.insertedId,
      name: newUser.name,
      email: newUser.email,
      additionalEmails: newUser.additionalEmails,
    },
  }
})