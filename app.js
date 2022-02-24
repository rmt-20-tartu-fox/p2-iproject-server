if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT || 3000

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

app.listen(PORT, (req, res) => {
  console.log('listen');
})


module.exports = app