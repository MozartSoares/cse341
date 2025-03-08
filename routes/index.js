import express from 'express';
import usersRouter from './users.js';

const router = express.Router();

router.get('/', (req, res) => res.send('Hello world'));

router.use('/users', usersRouter);

export default router;
