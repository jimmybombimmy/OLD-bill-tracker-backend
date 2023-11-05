import express from 'express';

import { getAllUsersModel } from '../db/models/users.models.js';

export const getAllUsers = ((req: express.Request, res: express.Response) => {
  getAllUsersModel()
    .then(rows => {
      res.status(200).send(rows)
    }) 
})
