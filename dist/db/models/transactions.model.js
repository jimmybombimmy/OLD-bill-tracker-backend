import { db } from "../connection.js";
export const getAllTransactionsModel = () => {
    return db.query(`SELECT * FROM transactions ORDER BY created_at DESC;`)
        .then(({ rows }) => {
        return rows;
    });
};
export const getTransactionsByUserModel = (res, user_id) => {
    return db.query(`SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC;`)
        .then(({ rows }) => {
        return rows;
    });
};
export const postNewTransactionModel = ((user_id, body) => {
    const txnName = body.name;
    const txnType = body.type;
    const txnFreq = body.frequency;
    return db.query(`
    INSERT INTO transactions
    (user_id, name, type, frequency)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;`, [user_id, txnName, txnType, txnFreq])
        .then(({ rows }) => {
        return rows[0];
    });
});
