require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression');

const mainRoutes = require('./routes/mainRoutes');
const models = require("./models/index");

models.init();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "Your secret key",
    expires: new Date(Date.now() + 30 * 86400 * 1000)
  })
);
app.use('/api', mainRoutes);

const PORT = 4000;

app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`);
})
