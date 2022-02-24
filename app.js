const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const errorHandler = require('./middlewares/errorsHandler');
require('dotenv').config();
const usersRoute = require('./routes/usersRoute');
const deckRoute = require('./routes/deckRoute');
const authentication = require('./middlewares/authentication');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/users', usersRoute);
app.use(authentication);
app.use('/deck', deckRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log('listening to port', port);
});