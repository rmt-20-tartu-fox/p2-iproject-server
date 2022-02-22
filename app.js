if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')

const app = express()
const errorHandler = require('./middleware/errorHandler');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const router = require('./routers')

app.use('/', router)
app.use(errorHandler)

app.listen(3000, (req, res) => {
  console.log('listen');
})


module.exports = app