import { Router } from 'express';
import CompanyRouter from './Companies';
// import ImportCSV from '../daos/Db/ImportCSV';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/companies', CompanyRouter);

// Export the base-router
export default router;
