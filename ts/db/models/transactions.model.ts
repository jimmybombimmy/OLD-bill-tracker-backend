import express from 'express';

import { db } from "../connection.js"


export const getAllTransactionsModel = () => {
  return db.query(`SELECT * FROM transactions ORDER BY created_at DESC;`)
    .then(({ rows }) => {
      return rows
    })
}

export const getTransactionsByUserModel = (res: express.Response, user_id: string) => {
  return db.query(`SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC;`)
    .then(({ rows }) => {
      return rows
    })
}