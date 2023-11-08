import express from 'express'

import { getAllTransactionsModel, getTransactionsByUserModel } from '../db/models/transactions.model.js'
import { getUserByIdModel } from '../db/models/users.model.js'
import { error400, error404 } from '../errors.js'

export const getAllTransactions = ((req: express.Request, res: express.Response) => {
  getAllTransactionsModel()
    .then(result => {
      res.status(200).send(result)
    })
})

export const getTransactionsByUser = (async (req: express.Request, res: express.Response) => {
  const { user_id } = req.params

  const user_idNumber = parseInt(user_id)
  if (isNaN(user_idNumber)) {
    return error400(res, 'userNaN')
  }

  let user404Check: number = 1
  await getUserByIdModel(res, user_id)!
    .then(result => {
      if (result === undefined) {
        user404Check = 0
      }
    })
  if (user404Check == 0) {
    return error404(res, 'userNotFound')
  }
  
  getTransactionsByUserModel(res, user_id)!
    .then(result => {
      res.status(200).send(result)
    })
})