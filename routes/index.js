import express from 'express';
import recipesRouter from './recipes.js';
import ingredientsRouter from './ingredients.js';
const router = express.Router();
import swaggerRouter from './swagger.js';

router.use('/', swaggerRouter);
router.get('/', (req, res) => {
  // #swagger.tags = ['Hello world']
  res.send('Hello world');
});

router.use('/recipes', recipesRouter);
router.use('/ingredients', ingredientsRouter);

export default router;
