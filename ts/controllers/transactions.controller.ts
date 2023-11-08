import express from 'express'

import { getAllTransactionsModel, getTransactionsByUserModel } from '../db/models/transactions.model.js'

export const getAllTransactions = ((req: express.Request, res: express.Response) => {
  getAllTransactionsModel()
    .then(result => {
      res.status(200).send(result)
    })
}) 

export const getTransactionsByUser = ((req: express.Request, res: express.Response) => {
  const {user_id} = req.params
  getTransactionsByUserModel(user_id)
    .then(result => {
      res.status(200).send(result)
    })
})