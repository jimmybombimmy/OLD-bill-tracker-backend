import express from 'express';

import { db } from "../connection.js"
import { TransactionDataInterface } from '../../interfaces/data.interfaces.js';


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

export const postNewTransactionModel = ((user_id: string, body: TransactionDataInterface) => {
  const txnName: string = body.name
  const txnType: number = body.type
  const txnFreq: string = body.frequency

  return db.query(`
    INSERT INTO transactions
    (user_id, name, type, frequency)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;`, [user_id, txnName, txnType, txnFreq])
    .then(({rows}) => {
      return rows[0]
    })
})