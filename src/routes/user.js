import { Router } from 'express';
import UserController from '../controller/user';

const router = Router();

router.post('/resetpassword', UserController.resetPassword);
 
export default router;