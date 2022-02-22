const cors = require("cors");
const express = require("express");
const app = express();
const FileController = require("./controllers/file");
const UserController = require("./controllers/user");
const PetController = require("./controllers/pet");
const WeatherController = require("./controllers/weather");
const errorHandler = require("./middleware/errorHandler");
const authentication = require("./middleware/authentication")
const { User } = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/register", UserController.register);
app.post("/login", UserController.login);
app.post("/upload", FileController.upload);
app.get("/weather", WeatherController.getWeather)

app.use(authentication)

app.get("/pet", PetController.checkPet)
app.post("/pet", PetController.createPet)
app.patch("/pet", PetController.feedPet)

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
