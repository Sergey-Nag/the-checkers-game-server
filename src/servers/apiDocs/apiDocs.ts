import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import apiDocs from './swagger.json';
console.log(apiDocs);

apiDocs.host = process.env.HOST ?? 'localhost:8080';

const apiDocRouter = Router();

apiDocRouter.use('/swagger', serve, setup(apiDocs));

export { apiDocRouter };
