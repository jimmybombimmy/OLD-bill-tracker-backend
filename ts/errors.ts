import express from 'express';

export const error404 = ((req: express.Request, res: express.Response) => {
  res.status(404).send({
    message: 'Error 404: Page not found'
  })
})