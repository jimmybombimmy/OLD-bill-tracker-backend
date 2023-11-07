import express from 'express';

import { getAllUsersModel, getUserByIdModel } from '../db/models/users.models.js';

export const getAllUsers = ((req: express.Request, res: express.Response) => {
  getAllUsersModel()
    .then(rows => {
      res.status(200).send(rows)
    }) 
})

export const getUserById = ((req: express.Request, res: express.Response) => {
  const {user_id} = req.params;
  getUserByIdModel(user_id)
    .then(result => {
      res.status(200).send(result[0])
    })
})
