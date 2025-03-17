import express from 'express';
import * as ingredientsController from '../controllers/ingredients.js';

const router = express.Router();

router.get('/', ingredientsController.getAll);
router.get('/:id', ingredientsController.getSingle);
router.post('/', ingredientsController.create);
router.put('/:id', ingredientsController.update);
router.delete('/:id', ingredientsController.remove);

export default router;
