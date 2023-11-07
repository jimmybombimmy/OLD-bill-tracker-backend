import express from 'express';

import { getAllUsersModel, getUserByIdModel } from '../db/models/users.models.js';
import { error404 } from '../errors.js';

export const getAllUsers = ((req: express.Request, res: express.Response) => {
  getAllUsersModel()
    .then(rows => {
      res.status(200).send(rows)
    }) 
})

export const getUserById = ((req: express.Request, res: express.Response) => {
  const {user_id} = req.params;
  getUserByIdModel(res, user_id)!
    .then((result) => {
      if (result === undefined) {
        return error404(res, 'userNotFound')
      }
      res.status(200).send(result)
    })
})
