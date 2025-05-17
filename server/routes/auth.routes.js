import { Router } from "express";
import { GetCurrentUser, Login, Logout } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/login', Login);
router.get('/get-current-user', GetCurrentUser);
router.post('/logout',Logout );


export default router;