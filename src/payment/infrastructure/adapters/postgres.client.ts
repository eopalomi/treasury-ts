import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config({path:`.env.${process.env.NODE_ENVIROMENT}`});

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB_NAME,
    log: (query) => console.log("Ejecutando Postgres: ",query)
});

export default pool;