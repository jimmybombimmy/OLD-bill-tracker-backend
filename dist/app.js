import express from 'express';
import { getAllUsers, getUserById } from './controllers/users.controller.js';
import { getAllTransactions, getTransactionsByUser } from './controllers/transactions.controller.js';
import { pageNotFound } from './errors.js';
// interface ReqRes { 
//   req: Request;
//   res: Response;
// } 
export const app = express();
app.get('/', (req, res) => {
    res.send('Express + TypeScript are running together');
});
app.get('/api/users', getAllUsers);
app.get('/api/users/:user_id', getUserById);
app.get('/api/transactions', getAllTransactions);
app.get('/api/users/:user_id/transactions', getTransactionsByUser);
app.get('/api/:anything', pageNotFound);
// const port = 9090  
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// }); 
// export {app}
