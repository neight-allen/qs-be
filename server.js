const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const foodsRouter = require('./lib/routers/foods-router');

app.use(bodyParser.json());
app.use('/api/v1/foods/', foodsRouter);

app.get('/', (request, response) => {
  response.send('Hello World!');
});

if (!module.parent) { // NEW!
  app.listen(3000, () => {
    console.log('QS is live! (http://localhost:3000)');
  });
}

module.exports = app;
