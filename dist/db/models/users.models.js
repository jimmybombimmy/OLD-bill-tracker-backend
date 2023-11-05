import { db } from "../connection.js";
export const getAllUsersModel = () => {
    return db.query(`SELECT * FROM users;`)
        .then(({ rows }) => {
        return rows;
    });
};
