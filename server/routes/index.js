import { Router } from "express";

import UserRoutes from './user.routes.js';
import AuthRoutes from './auth.routes.js';
import InvoiceRoutes from './invoice.routes.js';

const router = Router();
router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);
router.use('/invoice', InvoiceRoutes);

export default router;
