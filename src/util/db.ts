import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('Attempting to connect to PostgreSQL with the following parameters:');
console.log(`User: ${process.env.DB_USER}`);
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Database: ${process.env.DB_DATABASE}`);
console.log(`Port: ${process.env.DB_PORT}`);

const pool = new Pool({
  user:process.env.DB_USER,
  host:process.env.DB_HOST,
  database:process.env.DB_DATABASE,
  password:process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

export default pool;
