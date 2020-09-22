import { Express } from 'express';

import health_controller from './controllers/health.controller';

//variable app de tipo Express
const routes = (app: Express):void => {
    app.use('/v1/health', health_controller);
};

export default routes;