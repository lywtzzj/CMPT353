import { query } from './db.js';

export const getOrder = async (infor) => {
    // let sql = 'SELECT * FROM `order`' + (id ? ` WHERE userId = ${id}` : '');
    let sql = " SELECT * FROM `order` WHERE userId = " + infor.userId+" ORDER BY time";
    const result = await query(sql);
    console.log(result);
    return result;
    // return infor.userId ? result[-1] : result;
}

export const addOrder = async (add) => {
    let addO = ("INSERT INTO order (userId, time, ready, cancelled, content) VALUES ('" + add.userId + "', '" + new Date().toISOString() + "', 'not', 'not', '" + add.list + "');");
    console.log(addO);
    return await query("INSERT INTO `order` (userId, time, ready, cancelled, content) VALUES ('" + add.userId + "', '" + new Date().toISOString() + "', 'not', 'not', '" + add.list + "');");
};

export const sortOrder = async () => {
    return await query("SELECT * FROM `order` ORDER BY time");
}
export const getOrderStaff = async () => {
    return await query("SELECT * FROM `order`");
}
export const readyOrder = async (ready) => {
    await query("UPDATE `order` SET ready = 'yes' WHERE id = "+ready.id);
};
const sql = 'CREATE TABLE IF NOT EXISTS `order` (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, userId VARCHAR(50), time VARCHAR(50), ready VARCHAR(50), cancelled VARCHAR(50), content VARCHAR(250))';
// const sql = "CREATE TABLE IF NOT EXISTS 'order' ('id' INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 'userid' VARCHAR(50), 'timestamp' VARCHAR(50), 'ready' VARCHAR(50), 'cancelled' VARCHAR(50), 'content' VARCHAR(250))";
query(sql);