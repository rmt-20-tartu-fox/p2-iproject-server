if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const port =  3000;
const errorHandler = require("./middleware/errorHandler");

const router = require("./routes");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(errorHandler);

app.listen(port, (_) => console.log("Server is running on port:", port));