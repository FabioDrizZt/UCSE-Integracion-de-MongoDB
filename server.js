const { connectToDB, disconnectFromDB } = require('./src/mongodb.js');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({message: "Hoal mundo"})
})

app.get('/movies', async (req, res) => {
  const client = await connectToDB()
  const db = client.db('movies')
  const movies = await db.collection('movies').find().toArray()
  await disconnectFromDB()
  res.json ({movies})
})

app.listen(port, () => {
  console.log(`Ejecutandose en http://localhost:${port}`)
})
