const express = require('express');

const app = express();

app.use((reg,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/stuff', (reg,res,next) => {
  const stuff = [
    {
      _id: 'holoouugjfk',
      title: 'My first thing',
      description:'All info about my first thing',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Gitarre_und_Schattenspiel_01.jpg',
      price: 4900,
      userId: 'randompop',
    },
    {
      _id: 'mlqdsfhjo',
      title: 'My second thing',
      description:'All info about my second thing',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Gitarre_und_Schattenspiel_01.jpg',
      price: 100099,
      userId: 'randompop2',
    },
  ];
  res.status(200).json(stuff);
});

module.exports = app;