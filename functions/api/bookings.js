export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const method = request.method
  const pathParts = url.pathname.split('/')
  const id = pathParts[pathParts.length - 1]

  const uri = env.MONGODB_URI
  const { MongoClient, ObjectId } = await import('mongodb')
  
  const client = new MongoClient(uri)
  await client.connect()
  const collection = client.db('عيادتي').collection('bookings')}