import { MongoClient } from 'mongodb'

let client

export async function connectToDatabase() {
  if (client) {
    return client.db()
  }

  const { mongodbUri } = useRuntimeConfig()
  client = await MongoClient.connect(mongodbUri)
  return client.db()
}