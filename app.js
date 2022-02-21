const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
var cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use('/', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// module.exports = app