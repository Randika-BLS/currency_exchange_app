const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle users
app.use(express.json());
app.use(cors());
