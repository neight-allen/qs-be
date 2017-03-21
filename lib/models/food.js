const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const knex = require('knex')(configuration);

module.exports = {
  all: () => {
    let indexQuery = "SELECT * from foods";
    return knex.raw(indexQuery).then(resp => resp.rows);
  },
  find: (id) =>  {
    let getQuery = "SELECT * from foods WHERE id=?"
    return knex.raw(getQuery, [id]).then(resp => resp.rows[0] || undefined);
  },
  create: (food) => {
    let insertQuery = "INSERT INTO foods (name, calories) VALUES (?, ?)";
    let insertData = [food.name, food.calories];
    return knex.raw(insertQuery, insertData);
  },
  destroy: (id) => {
    let destroyQuery = "DELETE FROM foods WHERE id=?";
    return knex.raw(destroyQuery, [id]);
  },
  destroyAll: () => {
    let destroyQuery = "DELETE FROM foods";
    let resetQuery = "ALTER SEQUENCE foods_id_seq RESTART WITH 1"
    return Promise.all([
      knex.raw(destroyQuery),
      knex.raw(resetQuery)
    ]);
  }
}
