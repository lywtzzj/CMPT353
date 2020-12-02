import { getUser, addUser } from "../repository/user.js";

const url = '/user';

export default (app) => {
    app.post(`${url}/login`, (req, res) => {
        const user = req.body;
        res.json(await getUser(user.password));
    });
    app.post(`${url}/register`, (req, res) => {
        const new_user = req.body;
        await addUser(new_user)
        res.json(getUser(new_user.password));
    });
}