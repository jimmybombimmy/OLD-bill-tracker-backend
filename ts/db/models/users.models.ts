import express from 'express';

import { db } from "../connection.js"
import { error400 } from "../../errors.js"

export const getAllUsersModel = () => {
  return db.query(`SELECT * FROM users;`)
    .then(({rows}) => {
      return rows
    })
}

export const getUserByIdModel = (res: express.Response, user_id: string) => {
  const user_idNumber = parseInt(user_id)
  if (isNaN(user_idNumber)) {
    return error400(res, 'userNaN')
  }
  return db.query(`SELECT * FROM users WHERE user_id = ${user_id}`)
    .then(({rows}) => {
      return rows[0]   
    })
}