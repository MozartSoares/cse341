import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Recipes Api',
    description: 'Recipes Api',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
