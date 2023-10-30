import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
const fbApp = require("./firebase.ts")

dotenv.config();

console.log(fbApp)

const app: Express = express(); 
const port = process.env.PORT

console.log(port)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript are running together')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});