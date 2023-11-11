import express from 'express';

import { getAllUsersModel, getUserByIdModel, registerUserModel } from '../db/models/users.model.js';
import { error404 } from '../errors.js';

export const registerUser = (async (req: express.Request, res: express.Response) => {
  const newUser = req.body
  await registerUserModel(newUser.email, newUser.username, newUser.password)
    .then((body) => {
      res.status(201).send(body)
    })

  
})

export const getAllUsers = ((req: express.Request, res: express.Response) => {
  getAllUsersModel()
    .then(result => {
      res.status(200).send(result)
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
