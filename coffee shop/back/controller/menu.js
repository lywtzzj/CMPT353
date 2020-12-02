import { getMenu, addMenu, modifyMenu } from "../repository/menu.js";

const url = '/menu';

export default (app) => {
    app.get(url, async (req, res) => {
        res.json(await getMenu());
    });
    app.post(url, async (req, res) => {
        const menuItem = req.body;

        const menuItems = await getMenu();
        menuItem.id = menuItems.length + 1;
        await addMenu(menuItem);
    });
    app.put(url, async (req, res) => {
        const id = req.query.id;
        const modifications = req.body;

        await modifyMenu(id, modifications);
    });
}