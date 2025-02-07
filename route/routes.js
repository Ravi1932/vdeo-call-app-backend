const express = require('express');
const routs = express.Router();
const userController = require("../controller/user-controller");
const app = express();
app.use(express.json());

routs.post("/add", userController.addUser);
routs.get("/get", userController.getUser);
routs.put("/update/:id", userController.updateUser);
routs.delete("/delete/:id", userController.deleteUser);

routs.get("/chats", userController.getChats);
routs.post("/sendMessage", userController.sendMessage);

routs.post("/login", userController.userLogin);


module.exports = routs;