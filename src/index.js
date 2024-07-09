const app = require("./app");
const { connect } = require("./util/db");
const dotenv = require("dotenv");

dotenv.config();

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
