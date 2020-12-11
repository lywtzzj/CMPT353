import { getUser, addUser } from "../repository/user.js";

const url = '/user';

export default (app) => {
    app.post(`${url}/login`, async (req, res) => {
        const user = req.body;
        // res.json(getUser(user.password));
        res.json(await getUser(user));
    });
    app.post(`${url}/register`, async (req, res) => {
        const new_user = req.body;
        let result = res.json(await addUser(new_user));
        if (result == false) {
            res.send("the passwors is used")
        }
        
    });
}