import express from 'express';
import { initDb } from './data/database.js';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', routes);

initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  }
});
