import {Router} from 'express';
import AuthenticationController from '../controllers/auth.controller';

class AuthRouter{
    router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/signUp', AuthenticationController.signUp);
        this.router.post('/signIn', AuthenticationController.signIn);
    }
}
const authRoutes = new AuthRouter();
export default authRoutes.router;