import express from 'express';
import * as contactsController from '../controllers/contacts.js';

const router = express.Router();
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

export default router;
