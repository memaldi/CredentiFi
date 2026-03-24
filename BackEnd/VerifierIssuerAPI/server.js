require('dotenv').config()

const express = require('express');
const app = express()
const cors = require('cors');


app.use(express.json())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', 
    methods: ['GET', 'POST'],
  }));

  
const verifierRouter = require('./routes/verifierApi')
const issuerRouter = require('./routes/issuerApi')
app.use('/emitir', issuerRouter)
app.use('/verificar', verifierRouter)


app.listen(3000, () => console.log('Server is running on port 3000'))




