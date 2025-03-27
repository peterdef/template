import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import initializeDatabase from './util/initDb';
import checkDatabaseConnection from './util/checkDb';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`El servidor se ejecuta en el puerto: ${PORT}`);
  
  const isConnected = await checkDatabaseConnection();
  
  if (isConnected) {
    await initializeDatabase();
  } else {
    console.error('Error de conexion a la base de datos');
  }
});
