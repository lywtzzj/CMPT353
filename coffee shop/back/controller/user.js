import { getUser, addUser } from "../repository/user.js";

const url = '/user';

export default (app) => {
    app.post(`${url}/login`, (req, res) => {
        const user = req.body;
        // res.json(getUser(user.password));
        res.send(getUser(user.password))
    });
    app.post(`${url}/register`, (req, res) => {
        const new_user = req.body;
        let result = res.json(addUser(new_user));
        if (result == false) {
            res.send("the passwors is used")
        }
        // console.log(result);
        res.json(getUser(new_user.password));
    });
}