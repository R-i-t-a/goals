require('dotenv').config();
const client = require('../db-client');
const users = require('./users.json');

Promise.all(
  users.map(user => {
    return client.query(`
      INSERT INTO users (email, password)
      VALUES ($1, $2);
      `,
    [user.email, user.password]
    ).then(result => result.rows);
  })
)
  .then(
    () => console.log('seed data load sucessful'),
    err => console.error(err)
  )
  .then(() => client.end());