const { connectToDB, disconnectFromDB } = require('./src/mongodb.js');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({message: "Hoal mundo"})
})

app.get('/frutas', async (req, res) => {
  const client = await connectToDB()
  const db = client.db('frutas')
  const frutas = await db.collection('frutas').find().toArray()
  await disconnectFromDB()
  res.json ({frutas})
})

app.get('/frutas/:id', async (req, res) => {
    const frutasId = parseInt(req.params.id) || 0
  const client = await connectToDB()
  const db = client.db('frutas')
  const fruta = await db.collection('frutas').findOne({id: frutasId})
  await disconnectFromDB();
    (fruta) ? res.json(fruta) 
    : res.status(404).json({error:'404 - fruta not found'})
  
})

app.listen(port, () => {
  console.log(`Ejecutandose en http://localhost:${port}`)
})
