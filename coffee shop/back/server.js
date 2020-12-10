import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userController, menuController, orderController } from "./controller/index.js";
// import mysql from "mysql";


const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.json());
app.use('/', express.static('./'));
app.use(cors());

// add controllers
userController(app);
menuController(app);
orderController(app);

app.listen(PORT, HOST);

console.log(`Now listening on http://${HOST}:${PORT}`);