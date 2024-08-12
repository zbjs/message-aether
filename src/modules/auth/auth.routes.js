const authRouter = require("express").Router();

const {
  register,
  login,
  updateUser,
  deleteUser,
  logout,
} = require("./auth.controller");

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.put("/:id", updateUser);
authRouter.delete("/:id", deleteUser);
authRouter.post("/logout", logout);

module.exports = authRouter;
