import express from 'express';

import { getAllUsersModel } from '../db/models/users.models.js';

export const getAllUsers = ((req: express.Request, res: express.Response) => {
  getAllUsersModel()
    .then(rows => {
      res.status(200).send(rows)
    }) 
})

export const getUserById = ((req: express.Request, res: express.Response) => {
  res.status(200).send({})
})
