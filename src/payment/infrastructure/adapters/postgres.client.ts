import {Pool} from 'pg';

const pool = new Pool({
    user: 'epalomino',
    password: '4cc3s03p4L0M1n0',
    host: '10.3.3.51',
    port: 5432,
    database: 'PAGTES',
    log: (query) => console.log("Payment Repository: ", query)
})

export default pool;