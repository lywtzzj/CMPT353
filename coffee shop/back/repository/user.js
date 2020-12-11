// import { response } from 'express';
import { query } from './db.js';

export const getUser = async (user) => {
    let sql = "SELECT * FROM `user` WHERE username = '"+user.username+"'";
    const result = await query(sql); 
    console.log(result);  
    return result;

}

export const addUser = async (user) => {
    const result = await getUser(user);
    // console.log(result);
    if (result.length == 0) {
        await query(`INSERT INTO user (username, password, name, role) VALUES ('${user.username}', '${user.password}','${user.name}', '${user.role}')`);
        console.log("save exist item should not see ");
        return await getUser(user);;
    } else { return false; }
};
const sql = 'CREATE TABLE IF NOT EXISTS `user` (id int NOT NULL AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(50), name VARCHAR(50), role VARCHAR(50) , PRIMARY KEY (id))';
query(sql);