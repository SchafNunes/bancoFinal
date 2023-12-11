import 'dotenv/config';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST, // Endereço do servidor Redis
  port: process.env.REDIS_PORT, // Porta padrão do Redis
  db: process.env.REDIS_DB      // Banco de dados padrão do Redis
});

export default redis;


import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

export { mongoose };
