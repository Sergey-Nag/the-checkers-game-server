import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import apiDocs from './swagger.json';

const apiDocRouter = Router();

apiDocRouter.use('/swagger', serve, setup(apiDocs));

export { apiDocRouter };
