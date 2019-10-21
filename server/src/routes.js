import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ContactController from './app/controllers/ContactController';
import TransactionController from './app/controllers/TransactionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * From here on the routes must have jwt authentication
 */
routes.use(authMiddleware);

// Users
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.destroy);

// Contatcs
routes.get('/contacts', ContactController.index);
routes.post('/contacts', ContactController.store);
routes.delete('/contacts', ContactController.destroy);

// Transactions
routes.get('/transactions', TransactionController.index);
routes.post('/transactions', TransactionController.store);

export default routes;
