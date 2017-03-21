const assert = require('chai').assert;
const request = require('supertest');
const app = require('../server');
const Food = require('./lib/models/food');

describe('GET /foods', () => {

  beforeEach((done) => {
    Food.create({name}, done)
  });

  afterEach((done) => {
    Food.destroyAll(done)
  });

});
