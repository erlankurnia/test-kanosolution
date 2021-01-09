import { Router } from 'express';
import UserRouter from './Users';
import CompanyRouter from './Companies';
// import ImportCSV from '../daos/Db/ImportCSV';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/companies', CompanyRouter);

// Export the base-router
export default router;
