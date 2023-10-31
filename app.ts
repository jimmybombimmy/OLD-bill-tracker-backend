import express, { Express, Request, Response } from 'express';
const fbApp = require("./db/firebase.ts")

const app: Express = express();
const port = 9090

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript are running together')
}) 

app.get('/api/users')

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 