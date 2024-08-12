const app = require("./src/app");
const { connect } = require("./src/util/db");
const dotenv = require("dotenv");
const router = require("./src/routes");

dotenv.config();

app.use("/api", router);

const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

module.exports = app;
