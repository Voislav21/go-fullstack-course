//MONGODB PW: VZr15t6avovpULp9
//MONGODB CONNECTION: mongodb+srv://Voislav21:<password>@cluster0.xhdimgw.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff')

const app = express();

mongoose.connect('mongodb+srv://Voislav21:VZr15t6avovpULp9@cluster0.xhdimgw.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('All good, you connecting to mongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas :(');
    console.error(error);
  });

app.use(express.json());

app.use((reg,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes)

module.exports = app;