import { getAllUsersModel } from '../db/models/users.models.js';
export const getAllUsers = ((req, res) => {
    getAllUsersModel()
        .then(rows => {
        res.status(200).send(rows);
    });
});
