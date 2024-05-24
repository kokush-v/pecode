import dotenv from 'dotenv';
dotenv.config();

const CORS = {
  origin: 'http://localhost:3000', // Specify the allowed origin
  methods: ['GET', 'POST', 'PUT'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  exposedHeaders: ['Authorization'], // Specify the headers exposed to the client
  credentials: true, // Allow credentials
};

export { CORS };
