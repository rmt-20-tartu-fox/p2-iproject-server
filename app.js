const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT | 3000
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res) => res.send('hello world'))

app.listen(port, () => console.log('App running on port', port))