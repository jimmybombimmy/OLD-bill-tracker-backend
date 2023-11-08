import { getAllTransactionsModel, getTransactionsByUserModel } from '../db/models/transactions.model.js';
export const getAllTransactions = ((req, res) => {
    getAllTransactionsModel()
        .then(result => {
        res.status(200).send(result);
    });
});
export const getTransactionsByUser = ((req, res) => {
    const { user_id } = req.params;
    getTransactionsByUserModel(user_id)
        .then(result => {
        res.status(200).send(result);
    });
});
