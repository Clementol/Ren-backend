const express = require("express");
const compression =  require("compression");
const cors = require('cors')
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI, PORT } = require("./config");

const app = express()

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cors())

require("./routes")(app) // Routes

app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
    mongoose.connect(MONGO_URI)
    .then(() => console.info(`Connected to database`) )
    .catch(e => console.error(`Not connected to Database ${e}`))
  });