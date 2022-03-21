if(process.env.NODE_ENV == "development"){
  require("dotenv").config();
}
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');

app.use(cors());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);
app.use(errorHandler);

app.listen(port, () =>
  console.log(
    'HTTP Server up. Now go to http://localhost:3000/login in your browser.'
  )
);