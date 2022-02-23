const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");

// router import
const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/", router);

app.use(errorHandler);

app.listen(PORT, () => console.log("Running in port", PORT));
