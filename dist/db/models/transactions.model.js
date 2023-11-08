import { db } from "../connection.js";
export const getAllTransactionsModel = () => {
    return db.query(`SELECT * FROM transactions ORDER BY created_at DESC;`)
        .then(({ rows }) => {
        return rows;
    });
};
