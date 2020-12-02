import { query } from './db.js';

export const getMenu = async (id) => {
    let sql = 'SELECT * FROM menu' + (id ? ` WHERE id = ${id}` : '');
    const result = await query(sql);
    return id ? result[0] : result;
}

export const addMenu = async (menuItem) => {
    await query(`INSERT INTO menu (name, unitPrice) VALUES ('${menuItem.name}', '${menuItem.unitPrice}')`);
};

export const modifyMenu = async (id, modifications) => {
    const updates = [];

    for (const key of Object.keys(modifications)) {
        if (key != id) {
            updates.push(`${key} = '${modifications[key]}'`)
        }
    }
    await query(`UPDATE menu SET ${updates.join(', ')} WHERE id = '${id}'`);
}

const sql = 'CREATE TABLE IF NOT EXISTS menu (id int NOT NULL AUTO_INCREMENT, name VARCHAR(50), unitPrice FLOAT , PRIMARY KEY (id))';
query(sql);