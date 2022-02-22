require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT | 3000
const {errorHandler} = require('./middlewares/errorHandler')
const {register, login, fetchUsers} = require('./controllers/user')
const { addProduct, fetchProducts } = require('./controllers/product')
const { fetchCategories, addCategory } = require('./controllers/category')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res) => res.send('hello world'))
app.post('/register', register)
app.post('/login', login)
app.get('/users', fetchUsers)
app.get('/products', fetchProducts)
app.post('/products', addProduct)
app.get('/categories', fetchCategories)
app.post('/categories', addCategory)


app.use(errorHandler)

app.listen(port, () => console.log('App running on port', port))