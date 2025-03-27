import pool from './db';

async function checkDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database!');
    console.log(`Database: ${process.env.DB_DATABASE}`);
    console.log(`User: ${process.env.DB_USER}`);
    console.log(`Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    client.release();
    return true;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return false;
  }
}

export default checkDatabaseConnection; 