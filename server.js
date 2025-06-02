const { connectToDB, disconnectFromDB } = require('./src/mongodb.js');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(async (req,res,next) => {
    try {
        const client = await connectToDB()
        req.db = client.db('frutas')
        next()
    } catch {
        console.log('Error al conectarse a la DB');
    }
})

app.get('/', (req, res) => {
  res.json({message: "Hoal mundo"})
})

app.get('/frutas', async (req, res) => {
    try {
        const frutas = await req.db.collection('frutas').find().toArray()
        res.json ({frutas})
    } catch {
        console.log('error al traer la collection de frutas');
    } finally {
        await disconnectFromDB()
    }
})

app.get('/frutas/:id', async (req, res) => {
    try {
        const frutasId = parseInt(req.params.id) || 0
        const fruta = await req.db.collection('frutas').findOne({id: frutasId})
        (fruta) ? res.json(fruta) 
        : res.status(404).json({error:'404 - fruta not found'})
    } catch {
        console.log('error al traer la collection de frutas');
    } finally {
        await disconnectFromDB();
    }
    
})

app.use((req,res) => {
    res.status(404).json({message: 'Endpoint not found'})
})

app.listen(port, () => {
  console.log(`Ejecutandose en http://localhost:${port}`)
})
