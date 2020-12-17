import UserController from '../controller/user';
import { Router } from 'express';

const router = Router();

router.post('/resetpassword', UserController.resetPassword);
 
export default router;