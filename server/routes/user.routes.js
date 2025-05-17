import { Router } from "express";
import authenticate from '../middlewares/auth.middlewares.js';
import { createUser, GetAllUsers } from '../controllers/user.controllers.js';

const router = Router();
router.use(authenticate);
router.post('/create-user',authenticate ,createUser);
router.get('/get-all-users' ,GetAllUsers);

export default router;