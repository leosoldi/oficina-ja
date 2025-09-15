import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const routerAuth = Router();

routerAuth.post('/login', async  (req, res, next) => {
    try {
       await AuthController.login(req, res);
    }catch (err) {
        next(err);
    }
});

routerAuth.post('/register', async (req, res, next) => {
	try {
		await AuthController.register(req, res);
	} catch (err) {
		next(err);
	}
});

export default routerAuth;
