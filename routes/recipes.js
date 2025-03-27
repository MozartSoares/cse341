import express from 'express';
import * as recipesController from '../controllers/recipes.js';

const router = express.Router();

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getSingle);
router.post('/', recipesController.create);
router.put('/:id', recipesController.update);
router.delete('/:id', recipesController.remove);

export default router;
