import express from 'express';

export const error404 = ((res: express.Response, reason: string) => {
  if (reason === 'pageNotFound') {
    res.status(404).send({
      message: 'Error 404: Page not found'
    })
  } else if (reason === 'userNotFound') {
    res.status(404).send({
      message: 'Error 404: User ID not found'
    })
  }

})

export const error400 = ((res: express.Response, reason: string) => {
  if (reason === 'userNaN') {
    res.status(400).send({
      message: 'Error 400 - Bad Request: User path must be a number'
    })
  }
})

export const error409 = ((res: express.Response, reason: object) => {
  res.status(409).send(reason)
})

export const pageNotFound = ((req: express.Request, res: express.Response) => {
  return error404(res, 'pageNotFound')
})