import { getAllUsersModel, getUserByIdModel } from '../db/models/users.models.js';
export const getAllUsers = ((req, res) => {
    getAllUsersModel()
        .then(rows => {
        res.status(200).send(rows);
    });
});
export const getUserById = ((req, res) => {
    const { user_id } = req.params;
    getUserByIdModel(user_id)
        .then(result => {
        res.status(200).send(result[0]);
    });
});
