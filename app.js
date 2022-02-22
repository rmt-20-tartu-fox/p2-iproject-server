const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT | 3000
const {errorHandler} = require('./middlewares/errorHandler')
const {register} = require('./controllers/user')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res) => res.send('hello world'))
app.post('/register', register)

app.use(errorHandler)

app.listen(port, () => console.log('App running on port', port))