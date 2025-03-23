import swaggerAutogen from 'swagger-autogen';
import { config } from 'dotenv';
config();
const doc = {
  info: {
    title: 'Recipes Api',
    description: 'Recipes Api',
  },
  host: process.env.NODE_ENV === 'production' ? 'cse341-c52f.onrender.com' : 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
