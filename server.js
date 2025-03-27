import express from 'express';
import initDb from './data/database.js';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'origin, x-Requested-With, Content-Type, Accept,Z-key',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', routes);

initDb().then(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
