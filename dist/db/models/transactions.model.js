import { db } from "../connection.js";
import { error400 } from "../../errors.js";
export const getAllTransactionsModel = () => {
    return db.query(`SELECT * FROM transactions ORDER BY created_at DESC;`)
        .then(({ rows }) => {
        return rows;
    });
};
export const getTransactionsByUserModel = (res, user_id) => {
    const user_idNumber = parseInt(user_id);
    if (isNaN(user_idNumber)) {
        return error400(res, 'userNaN');
    }
    return db.query(`SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY created_at DESC;`)
        .then(({ rows }) => {
        return rows;
    });
};
