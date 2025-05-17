import { Router } from "express";
import authenticate from '../middlewares/auth.middlewares.js';
import { createInvoice } from '../controllers/invoice.controllers.js';

const router = Router();
router.use(authenticate);
router.post('/', createInvoice);
export default router;