// Load environment variables. ALWAYS PUT ON TOP
require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
