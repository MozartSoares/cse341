import express from 'express';
import contactsRouter from './contacts.js';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello world'));

router.use('/contacts', contactsRouter);

export default router;
