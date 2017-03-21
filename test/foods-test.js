const assert = require('assert');
const request = require('request');
const app = require('../server');
const Food = require('../lib/models/food');

describe('Server', () => {

  before((done) => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  context('GET /', () => {

    it('should return a success response', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should return hello world', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes("Hello World"));
        done();
      });
    });

  });

  context('GET /api/v1/:id', () => {

    beforeEach((done) => {
      Food.create({name: "Banana", calories: 35}).then(() => done()).catch(done)
    });

    afterEach((done) => {
      Food.destroyAll().then(() => done()).catch(done);
    });

    it('should return a 404 if the resource is not found', (done) => {
      this.request.get('/api/v1/foods/10000', (error, response) => {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should have the name and calories from the food', (done) => {
      let foodId = 1;

      Food.find(foodId).then( (food) => {
        this.request.get(`/api/v1/foods/${foodId}`, (error, response) => {
  		    if (error) { done(error); }

          let responseFood = JSON.parse(response.body);

  		    assert.equal(food.name, responseFood.name, `"${response.body}" does not include "${food.name}".`);
  		    assert.equal(food.calories, responseFood.calories, `"${response.body}" does not include "${food.calories}".`);
  		    done();
  		  });
      });
		});

  });

});
