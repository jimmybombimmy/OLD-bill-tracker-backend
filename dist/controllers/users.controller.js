import { getAllUsersModel, getUserByIdModel, registerUserModel } from '../db/models/users.model.js';
import { error404 } from '../errors.js';
export const registerUser = (async (req, res) => {
    const newUser = req.body;
    await registerUserModel(newUser.email, newUser.username, newUser.password)
        .then((body) => {
        res.status(201).send(body);
    });
});
export const getAllUsers = ((req, res) => {
    getAllUsersModel()
        .then(result => {
        res.status(200).send(result);
    });
});
export const getUserById = ((req, res) => {
    const { user_id } = req.params;
    getUserByIdModel(res, user_id)
        .then((result) => {
        if (result === undefined) {
            return error404(res, 'userNotFound');
        }
        res.status(200).send(result);
    });
});
