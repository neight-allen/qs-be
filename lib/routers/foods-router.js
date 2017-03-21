const FoodsRouter = require('express').Router();
const Food = require('../models/food');

FoodsRouter.get('/', (request, response) => {
  Food.all()
    .then((data) => {
      response.send(data);
    })
    .catch((error) => {
      response.status(500).send({ error: error.message });
    });
});

FoodsRouter.get('/:id', (request, response) => {
  Food.find(request.params.id)
    .then((data) => {
      if(data) {
        response.send(data);
      } else {
        response.status(404).send({error: "resource not found"})
      }

    })
    .catch((error) => {
      response.status(500).send({ error: error.message });
    });
});

FoodsRouter.post('/', (request, response) => {
  Food.create(request.body)
    .then( data => {
      response.sendStatus(201);
    })
    .catch( error => {
      response.status(500).send({ error: err.message });
    });
});

module.exports = FoodsRouter;
