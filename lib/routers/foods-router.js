const FoodsRouter = require('express').Router();
const Food = require('../models/food');

FoodsRouter.get('/', (request, response) => {
  Food.all(function(err, result) {
    if(err) {
      response.status(500).send({ error: err.message })
    } else {
      response.send(result.rows);
    }
  });
});

FoodsRouter.post('/', (request, response) => {
  Food.create(request.body, function(err, result){
    if(err){
      response.status(500).send({ error: err.message });
    } else {
      response.sendStatus(201);
    }
  });
});

module.exports = FoodsRouter;
