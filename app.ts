import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
const fbApp = require("./firebase.ts")

dotenv.config();

const app: Express = express(); 
const port = 9090

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript are running together')
})

app.get('/users, ')

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); 