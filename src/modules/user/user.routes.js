const userRouter = require("express").Router();

const { profile } = require("./user.controller");
const verifyToken = require("../auth/auth.middleware");
const { dashboard } = require("./user.controller");

userRouter.get("/profile", verifyToken, profile);
userRouter.get("/dashboard", verifyToken, dashboard);

module.exports = userRouter;
