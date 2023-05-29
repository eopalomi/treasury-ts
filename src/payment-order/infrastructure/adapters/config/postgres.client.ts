import { Pool } from 'pg';

export class postgresDatabase {
  private static connection: Pool;

  static getConnection() {
    if (!postgresDatabase.connection) {
      return new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        database: process.env.DB_NAME,
        log: (query) => console.log('Ejecutando Postgres: ', query)
      });
    }

    return postgresDatabase.connection;
  }
}
