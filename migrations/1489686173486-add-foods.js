'use strict'
const pg = require('pg');
// const config = require('../config/db')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/qs_development';
const client = new pg.Client(connectionString);

exports.up = function(next) {
  client.connect();
  let createQuery = `create table foods(
    id serial primary key not null,
    name text,
    calories int
  )`;
  client.query(createQuery, function(err){
    if(err){ throw err; }
    next();
  })
};

exports.down = function(next) {
  client.connect();
  let dropQuery = `drop table foods`;
  client.query(dropQuery, function(err){
    if(err){ throw err; }
    next();
  })
};
