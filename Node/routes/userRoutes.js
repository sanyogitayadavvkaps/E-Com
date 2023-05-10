const express = require("express");
const {
  registerController,
  getUserController,
  removeUserController,
  getUserByIdController,
  updateUserContoller,
  loginController,
} = require("../Controller/userController");
const userRoutes = express.Router();
const cors = require("cors");
userRoutes.use(cors());

userRoutes.post("/register", registerController);
userRoutes.post("/login", loginController);
userRoutes.get("/get-user", getUserController);
userRoutes.delete("/remove-user/:id", removeUserController);
userRoutes.get("/get-user/id/:id", getUserByIdController);
userRoutes.put("/update-user/:id", updateUserContoller);
   





module.exports = userRoutes;
