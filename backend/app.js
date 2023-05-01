//MONGODB PW: VZr15t6avovpULp9
//MONGODB CONNECTION: mongodb+srv://Voislav21:<password>@cluster0.xhdimgw.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing');

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

app.post('/api/stuff', (reg,res,next) => {
  const thing = new Thing({
    title: reg.body.title,
    description: reg.body.description,
    imageUrl: reg.body.imageUrl,
    price: reg.body.price,
    userId: reg.body.userId
  });
  thing.save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }).catch((error) => {
      res.status(400).json({
        error: error
      });
    });
});

app.get('/api/stuff/:id', (reg,res,next) => {
  Thing.findOne({
    _id: reg.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.put('/api/stuff/:id', (reg,res,next)=>{
  const thing = new Thing({
    _id: reg.params.id,
    title: reg.body.title,
    description: reg.body.description,
    imageUrl: reg.body.imageUrl,
    price: reg.body.price,
    userId: reg.body.userId
  });
  Thing.updateOne({_id: reg.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.delete('/api/stuff/:id', (reg,res,next) => {
  Thing.deleteOne({_id: reg.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.use('/api/stuff', (reg,res,next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

module.exports = app;