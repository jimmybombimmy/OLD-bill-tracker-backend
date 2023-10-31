import format = require('pg-format')
import {db} from '../connection.js'

console.log(db)

interface databaseTables {
  usersData: object[];
  paymentTypesData: object[];
  transactionsData: object[];
}
const seed = (data: databaseTables) => {
  console.log(data.usersData)
  return db
    .query(`DROP TABLE IF EXISTS transactions;`)
    .then(() => {
      
      db.query(`DROP TABLE IF EXISTS payment_types;`)
    })
    .then(() => {
      db.query(`DROP TABLE IF EXISTS users;`)
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL
      );`)
    })
    .then(() => {

      interface userColumns {
        username: string;
        email: string;
        password: string;
      } 

      const insertUsersQueryStr = format(
        `INSERT INTO users (username, email, password) VALUES %L RETURNING *;`,
        data.usersData.map((user) => [
          user.username,
          user.email,
          user.password
        ]
        )
      )
      return db.query(insertUsersQueryStr);
    })
}
module.exports = {seed}