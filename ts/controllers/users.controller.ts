import express from 'express';


export const getAllUsers = ((req: express.Request, res: express.Response) => {
  res.send([])  
})

// module.exports = {getAllUsers}