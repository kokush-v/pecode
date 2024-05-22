import dotenv from 'dotenv';
dotenv.config();

const SQ = {
  DATABASE: process.env.DATABASE,
  USERNAME: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSOWRD,
};

const CORS = {
  origin: 'http://localhost:5858', // Specify the allowed origin
  methods: ['GET', 'POST', 'PUT'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  exposedHeaders: ['Authorization'], // Specify the headers exposed to the client
  credentials: true, // Allow credentials
};

export { SQ, CORS };
