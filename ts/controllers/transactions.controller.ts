import express from 'express'

import { getAllTransactionsModel } from '../db/models/transactions.model.js'

export const getAllTransactions = ((req: express.Request, res: express.Response) => {
  getAllTransactionsModel()
    .then(rows => {
      res.status(200).send(rows)
    })
}) 