const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

database.raw('INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING id, name, calories', ["something", 44]).then( (data) => {
  // database.raw('SELECT * FROM foods')
  // .then( (data) => {
    console.log(data.rows)
    process.exit();
  });
// });
