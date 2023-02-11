// Load environment variables. ALWAYS PUT ON TOP
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const sequelize = require("./models/db");
const router = require("./routes");
const errorHandler = require("./middlewares/error");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan("common"));
app.use(express.json());

app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

startServer();
