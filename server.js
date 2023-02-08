// Load environment variables. ALWAYS PUT ON TOP
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

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
const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
