const express = require ('express');
const router = express.Router();

const Thing = require('../models/thing')

router.post('/', (reg,res,next) => {
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
  
router.get('/:id', (reg,res,next) => {
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

router.put('/:id', (reg,res,next)=>{
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

router.delete('/:id', (reg,res,next) => {
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

router.get('/', (reg,res,next) => {
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




module.exports = router;