const authRouter = require("express").Router();

const verifyToken = require("./auth.middleware");

const {
  register,
  login,
  updateUser,
  deleteUser,
  logout,
  getAllUsers,
  changePassword,
} = require("./auth.controller");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/users", verifyToken, getAllUsers);

authRouter.put("/:id", verifyToken, updateUser);
authRouter.delete("/:id", verifyToken, deleteUser);
authRouter.post("/logout", verifyToken, logout);

authRouter.post("/change-password", verifyToken, changePassword);

module.exports = authRouter;
