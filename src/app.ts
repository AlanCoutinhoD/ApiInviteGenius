import "dotenv/config";
import express from 'express';
import cors from 'cors';
//import {router} from './routes/';
import db from "./config/mongo"
import {router} from './routes/user'
import { routerEvent } from "./routes/event";


const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(routerEvent);
//app.use(routerUser);
db().then(() => console.log("Base de datos lista"));
app.listen (PORT, () => console.log('iniciado en el port 3001'));


export default router