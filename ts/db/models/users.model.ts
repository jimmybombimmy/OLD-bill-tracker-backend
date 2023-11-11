import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy
import bcrypt from 'bcrypt'

import { db } from "../connection.js"
import { error400 } from "../../errors.js"

export const registerUserModel = async (email: string, username: string, password: string) => {
  let usernameConflict: boolean = false
  let emailConflict: boolean = false

  await db.query(`SELECT * FROM users;`)
  .then(({rows}) => {
    rows.forEach((user) => {
      if (user.username === username) {
        usernameConflict = true
      }
      if (user.email === email) {
        emailConflict = true
      }
    })
  })
  
  if (usernameConflict != false) {
    return {message: "Error 409: Username already exists"}
  } else if (emailConflict != false) {
    return {message: "Error 409: User already registered with email"}
  }

  return await bcrypt.hash(password, 10)
    .then((securePass) => {
      return db.query(`
    INSERT INTO users
    (username, email, password)
    VALUES
    ($1, $2, $3)
    RETURNING *;
    `, [username, email, securePass])
    })
    .then(({ rows }) => {
      return rows[0]
    })
}

export const getAllUsersModel = () => {
  return db.query(`SELECT * FROM users;`)
    .then(({ rows }) => {
      return rows
    })
}

export const getUserByIdModel = (res: express.Response, user_id: string) => {
  const user_idNumber = parseInt(user_id)
  if (isNaN(user_idNumber)) {
    return error400(res, 'userNaN')
  }
  return db.query(`SELECT * FROM users WHERE user_id = ${user_id}`)
    .then(({ rows }) => {
      return rows[0]
    })
}