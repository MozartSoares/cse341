import express from 'express';
const router = express.Router();
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL('../swagger.json', import.meta.url), 'utf-8'),
);
router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));
export default router;
