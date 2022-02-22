const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// router import
const router = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => console.log("Running in port", PORT));
