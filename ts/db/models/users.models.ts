import { db } from "../connection.js"

export const getAllUsersModel = () => {
  return db.query(`SELECT * FROM users;`)
    .then(({rows}) => {
      return rows
    })
}

export const getUserByIdModel = (user_id: string) => {
  return db.query(`SELECT * FROM users WHERE user_id = ${user_id}`)
    .then(({rows}) => {
      return rows
    })
}