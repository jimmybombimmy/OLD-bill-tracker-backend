"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format = require("pg-format");
const connection_js_1 = require("../connection.js");
console.log(connection_js_1.db);
const seed = (data) => {
    console.log(data.usersData);
    return connection_js_1.db
        .query(`DROP TABLE IF EXISTS transactions;`)
        .then(() => {
        connection_js_1.db.query(`DROP TABLE IF EXISTS payment_types;`);
    })
        .then(() => {
        connection_js_1.db.query(`DROP TABLE IF EXISTS users;`);
    })
        .then(() => {
        return connection_js_1.db.query(`
      CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL
      );`);
    })
        .then(() => {
        const insertUsersQueryStr = format(`INSERT INTO users (username, email, password) VALUES %L RETURNING *;`, data.usersData.map((user) => [
            user.username,
            user.email,
            user.password
        ]));
        return connection_js_1.db.query(insertUsersQueryStr);
    });
};
module.exports = { seed };
