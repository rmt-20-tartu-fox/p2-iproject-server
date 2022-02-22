const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log('listening to port', port);
});