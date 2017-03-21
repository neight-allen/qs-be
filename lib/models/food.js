const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/qs_development';
const client = new pg.Client(connectionString);

module.exports = {
  all: function(callback) {
    let indexQuery = "select * from foods";
    client.connect();
    client.query(indexQuery, callback)
  },
  create: function(food, callback) {
    let insertQuery = "insert into foods (name, calories) values ($1, $2)";
    let insertData = [food.name, food.calories];
    client.connect();
    client.query(insertQuery, insertData, callback);
  },
  destroy: function(foodId, callback) {
    let destroyQuery = "delete from foods where id=$1"
    client.connect();
    client.query(destroyQuery, [foodId], callback)
  }
  destroyAll: function(callback) {
    let destroyQuery = "delete from foods"
    client.connect();
    client.query(destroyQuery, callback);
  }
}
