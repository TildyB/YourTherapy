const dotenv = require("dotenv")
dotenv.config();
const express = require('express');
const client = require('./router/client')
const psychologist = require('./router/psychologist')
const cors  = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/client', client)
app.use('/api/psychologist', psychologist)




module.exports = app
