import { getOrder, addOrder, sortOrder, readyOrder,getOrderStaff } from "../repository/order.js";
const url = '/order';

export default (app) => {
    app.get(url, async (req, res) => {
        let infor = req.body;
        res.json(await getOrder(infor));
        res.send('get');
    });
    app.post(url, async (req, res) => {
        let new_order = req.body;
        await addOrder(new_order);
        res.send('add');
    });
    app.put(`${url}/sort`, async (req, res) => {
        res.json(await sortOrder());
        res.send('staff sort');
    });
    app.put(`${url}/getOrderStaff`, async (req, res) => {
        res.json(await getOrderStaff());
        res.send('getOrderStaff');
    });
    app.put(`${url}/ready`, async (req, res) => {
        let ready = req.body;
        res.json(await readyOrder(ready));
        res.send('put menu');
    });
}
