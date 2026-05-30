import { MongoClient, ObjectId } from 'mongodb'

// ⚠️ استبدل الرابط برابط MongoDB Atlas حقك
const uri = "mongodb://mar96mus97_db_user:UIvbZFWDsz5g4EiM@ac-lysv7ct-shard-00-00.mmoqsho.mongodb.net:27017,ac-lysv7ct-shard-00-01.mmoqsho.mongodb.net:27017,ac-lysv7ct-shard-00-02.mmoqsho.mongodb.net:27017/?ssl=true&replicaSet=atlas-bzk151-shard-0&authSource=admin&appName=Cluster0"

let client

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client.db('عيادتي').collection('bookings')
}

export default async (event) => {
  const collection = await connectDB()
  const method = event.httpMethod
  const path = event.path.split('/')
  const id = path[path.length - 1]

  try {
    // GET - جلب كل الحجوزات
    if (method === 'GET' && !id.match(/^[0-9a-fA-F]{24}$/)) {
      const bookings = await collection.find().sort({ createdAt: -1 }).toArray()
      return {
        statusCode: 200,
        body: JSON.stringify(bookings)
      }
    }

    // POST - إضافة حجز جديد
    if (method === 'POST') {
      const data = JSON.parse(event.body)
      const booking = { ...data, createdAt: new Date() }
      const result = await collection.insertOne(booking)
      return {
        statusCode: 200,
        body: JSON.stringify({ id: result.insertedId, ...booking })
      }
    }

    // PUT - تحديث حالة حجز
    if (method === 'PUT' && id.match(/^[0-9a-fA-F]{24}$/)) {
      const { status } = JSON.parse(event.body)
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } })
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      }
    }

    // DELETE - حذف حجز
    if (method === 'DELETE' && id.match(/^[0-9a-fA-F]{24}$/)) {
      await collection.deleteOne({ _id: new ObjectId(id) })
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      }
    }

    return { statusCode: 404, body: 'Not found' }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}