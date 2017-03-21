const pg = require('pg-promise')();
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/qs_development';
const db = pg(connectionString);

module.exports = {
  all: () => {
    let indexQuery = "select * from foods";
    return db.query(indexQuery);
  },
  find: (id) =>  {
    let getQuery = "select * from foods where id=$1"
    return db.query(getQuery, id).then(data => data[0]);
  },
  create: (food) => {
    let insertQuery = "insert into foods (name, calories) values ($1, $2)";
    let insertData = [food.name, food.calories];
    return db.query(insertQuery, insertData);
  },
  destroy: (id) => {
    let destroyQuery = "delete from foods where id=$1";
    return db.query(destroyQuery, id);
  },
  destroyAll: () => {
    let destroyQuery = "delete from foods";
    let resetQuery = "ALTER SEQUENCE foods_id_seq RESTART WITH 1"
    return Promise.all([
      db.query(destroyQuery),
      db.query(resetQuery)
    ]);
  }
}
