const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const morgan = require("morgan");
const {disconnect } = require("./util/db");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( routes);

process.on("SIGINT", async () => {
  await disconnect();
  process.exit(0);
});

module.exports = app;
