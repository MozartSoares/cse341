import express from 'express';
import * as contactsController from '../controllers/contacts.js';

const router = express.Router();

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.create);
router.put('/:id', contactsController.update);
router.delete('/:id', contactsController.remove);

export default router;
