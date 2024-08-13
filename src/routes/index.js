const Router = require("express").Router;

const router = new Router();
const authRouter = require("../modules/auth/auth.routes");
const userRouter = require("../modules/user/user.routes");
const blogRouter = require("../modules/blog/blog.routes");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/blog", blogRouter);

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    routes: {
      auth: {
        login: "/auth/login",
        register: "/auth/register",
        logout: "/auth/logout",
      },
      user: {
        profile: "/user/profile",
        dashboard: "/user/dashboard",
      },
      blog: {
        create: "/blog/create",
        get: "/blog/get",
        update: "/blog/update",
        delete: "/blog/delete",
        getAll: "/blog/getAll",
      },
    },
  });
});

module.exports = router;
