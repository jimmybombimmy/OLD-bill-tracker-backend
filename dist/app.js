import express from 'express';
import { getAllUsers } from './controllers/users.controller.js';
// interface ReqRes { 
//   req: Request;
//   res: Response;
// } 
export const app = express();
app.get('/', (req, res) => {
    res.send('Express + TypeScript are running together');
});
app.get('/api/users', getAllUsers);
// const port = 9090  
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// }); 
// export {app}
