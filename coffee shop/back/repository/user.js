import { query } from './db.js';

export const getUser = async (password) => {
    let sql = 'SELECT * FROM user' + (password ? ` WHERE id = ${password}` : '');
    const result = await query(sql);
    return password ? result[0] : result;
}

export const addUser = async (menuItem) => {
    
    await query(`INSERT INTO user (name, unitPrice) VALUES ('${menuItem.name}', '${menuItem.unitPrice}')`);
};
const sql = 'CREATE TABLE IF NOT EXISTS user (id int NOT NULL AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(50), name VARCHAR(50), role VARCHAR(50) , PRIMARY KEY (id))';
query(sql);