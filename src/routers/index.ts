import express from 'express';
import TodoRouters from './todos.router';

const router = express.Router();

const ApplicationRoutes = (): express.Router => {

    TodoRouters(router);

    return router;
}

export default ApplicationRoutes;
