const assert = require('chai').assert;
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

});
