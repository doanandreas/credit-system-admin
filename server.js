// Load environment variables. ALWAYS PUT ON TOP
require("dotenv").config();

const express = require("express");
const router = require("./routes");

const app = express();
app.use(router);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
