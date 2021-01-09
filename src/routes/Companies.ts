/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import ImportCSV from '@daos/Db/ImportCSV';
import { paramMissingError, IRequestCompany } from '@shared/constants';
import { IDataset } from '@entities/Company';

const router = Router();
const importCSV = new ImportCSV();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/******************************************************************************
 *                      Get All Companies - "GET /api/companies/all"
 ******************************************************************************/
router.get('/all', async (req: Request, res: Response) => {
	const dataset: IDataset = await importCSV.getAll(req);
	return res.status(OK).json(dataset);
});

/******************************************************************************
 *                       Add One - "POST /api/companies/add"
 ******************************************************************************/
router.post('/add', async (req: IRequestCompany, res: Response) => {
	const { dataset } = req.body;
	
	if (!dataset) {
		return res.status(BAD_REQUEST).json({
			error: paramMissingError,
		});
	}
	
	const result: IDataset = await importCSV.add(req, dataset);

	return res.status(CREATED).json(result);
});

/******************************************************************************
 *                       Update - "PUT /api/companies/update"
 ******************************************************************************/
router.put('/update', async (req: IRequestCompany, res: Response) => {
	const { dataset } = req.body;

	if (!dataset) {
		return res.status(BAD_REQUEST).json({
			error: paramMissingError,
		});
	}
	
	const result: IDataset = await importCSV.update(req, dataset);
	
	return res.status(OK).json(result);
});

/******************************************************************************
 *                    Delete - "DELETE /api/companies/delete/:id"
 ******************************************************************************/
// router.delete('/delete/:id', async (req: IRequestCompany, res: Response) => {
// 	const { id } = req.params;
// 	await importCSV.delete<IFetchResponse>(req);
// 	return res.status(OK).end();
// });

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
