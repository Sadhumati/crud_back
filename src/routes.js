import Router from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

/*Rotas CRUD*/
routes.post('/user', UserController.create);
routes.put('/user/:id', UserController.update);
routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.show);
routes.delete('/user/:id', UserController.destroy);

export default routes;