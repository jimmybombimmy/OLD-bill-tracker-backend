import express from 'express';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import { getAllUsers, getUserById, registerUser } from './controllers/users.controller.js';
import { getAllTransactions, getTransactionsByUser, postNewTransaction } from './controllers/transactions.controller.js';
import { pageNotFound } from './errors.js';
// interface ReqRes { 
//   req: Request;
//   res: Response;
// } 
export const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript are running together');
});
app.post('/api/auth/register', registerUser);
app.get('/api/users', getAllUsers);
app.get('/api/users/:user_id', getUserById);
app.get('/api/transactions', getAllTransactions);
app.get('/api/users/:user_id/transactions', getTransactionsByUser);
app.post('/api/transactions/:user_id', postNewTransaction);
app.get('/api/:anything', pageNotFound);
// const port = 9090  
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// }); 
// export {app}
