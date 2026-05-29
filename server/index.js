import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

// ⚠️ استبدل الرابط برابط MongoDB Atlas حقك
const uri = "mongodb://mar96mus97_db_user:UIvbZFWDsz5g4EiM@ac-lysv7ct-shard-00-00.mmoqsho.mongodb.net:27017,ac-lysv7ct-shard-00-01.mmoqsho.mongodb.net:27017,ac-lysv7ct-shard-00-02.mmoqsho.mongodb.net:27017/?ssl=true&replicaSet=atlas-bzk151-shard-0&authSource=admin&appName=Cluster0"
const client = new MongoClient(uri)

async function connectDB() {
  try {
    await client.connect()
    console.log('✅ متصل بقاعدة البيانات MongoDB')
  } catch (error) {
    console.error('❌ خطأ في الاتصال:', error)
  }
}

connectDB()

const db = client.db('عيادتي')
const bookingsCollection = db.collection('bookings')

// جلب كل الحجوزات
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await bookingsCollection.find().sort({ createdAt: -1 }).toArray()
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// إضافة حجز جديد
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = {
      ...req.body,
      createdAt: new Date()
    }
    const result = await bookingsCollection.insertOne(booking)
    res.json({ id: result.insertedId, ...booking })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// تحديث حالة حجز
app.put('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    )
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// حذف حجز
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params
    await bookingsCollection.deleteOne({ _id: new ObjectId(id) })
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`)
})