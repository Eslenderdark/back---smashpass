import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   password: '1234',
//   host: 'localhost',
//   port: 5432, // default Postgres port
//   database: 'clashofclans'
// });

const pool = new Pool({
  user: 'clashofclans_user',
  password: 'kkklJzDEp8tLAz549v2B5SjBSADqwaWM',
  host: 'dpg-d08eufvgi27c738hev00-a',
  port: 5432, // default Postgres port
  database: 'clashofclans'
});

export function query(text: any): any {
    return pool.query(text);
};