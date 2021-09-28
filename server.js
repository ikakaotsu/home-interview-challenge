const express = require("express");
const next = require("next");
require("dotenv").config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production"; //true or false
const app = next({ dev });
const handle = app.getRequestHandler();

const mongoose = require("mongoose");

//MongoDb Conection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//MVCS Configuration
const ConfigurationModel = require("./models/inputs.json");
const ConfigurationService = require("./services/ConfigurationService");
const ConfigurationController = require("./controllers/ConfigurationController");
//MVCS User
const UserModel = require("./models/Users");
const UserService = require("./services/UserService");
const UserController = require("./controllers/UserController");

//Configuration instances
const ConfigurationServiceInstance = new ConfigurationService(
  ConfigurationModel
);

const ConfigurationControllerInstance = new ConfigurationController(
  ConfigurationServiceInstance
);

//User instances
const UserServiceInstance = new UserService(UserModel);
const UserControllerInstance = new UserController(UserServiceInstance);

app.prepare().then(() => {
  const server = express();
  server.use(express.urlencoded({ extended: true })); //ika
  server.use(express.json()); //ika

  //get configuration by path
  server.get("/configuration/:path", (req, res) => {
    ConfigurationControllerInstance.get(req, res);
  });

  server.post("/:path", (req, res) => {
    const { url } = req;
    if (url === "/register") {
      UserControllerInstance.create(req, res);
    }
    if (url === "/login") {
      UserControllerInstance.findOne(req, res);
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
