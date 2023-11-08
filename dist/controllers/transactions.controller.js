import { getAllTransactionsModel } from '../db/models/transactions.model.js';
export const getAllTransactions = ((req, res) => {
    getAllTransactionsModel()
        .then(rows => {
        res.status(200).send(rows);
    });
});
