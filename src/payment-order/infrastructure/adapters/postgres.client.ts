import { Pool } from 'pg'

const pool = new Pool({
    user: 'epalomino',
    password: '4cc3s03p4L0M1n0',
    host: '10.3.3.51',
    port: 5432,
    database: 'PAGTES',
    log: (query) => console.log("Ejecutando Postgres: ",query)
});

// Escucha el evento 'query' del objeto de pool pg
// pool.on('connect', (query) => {
//     console.log(query.text); // Imprime la consulta SQL
//     console.log(query.values); // Imprime los parámetros utilizados
// });
  

export default pool;
