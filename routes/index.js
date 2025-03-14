import express from 'express';
import contactsRouter from './contacts.js';
const router = express.Router();
import swaggerRouter from './swagger.js';

router.use('/', swaggerRouter);
router.get('/', (req, res) => {
  // #swagger.tags = ['Hello world']
  res.send('Hello world');
});

router.use('/contacts', contactsRouter);

export default router;
