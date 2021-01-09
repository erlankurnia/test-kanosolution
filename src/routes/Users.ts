/* eslint-disable @typescript-eslint/no-misused-promises */
import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import ImportCSV from '@daos/User/UserDao';
import { paramMissingError, IRequest } from '@shared/constants';

const router = Router();
const importCSV = new ImportCSV();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
	const users = await importCSV.getAll();
	return res.status(OK).json({users});
});



/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: IRequest, res: Response) => {
	const { user } = req.body;
	if (!user) {
		return res.status(BAD_REQUEST).json({
			error: paramMissingError,
		});
	}
	await importCSV.add(user);
	return res.status(CREATED).end();
});



/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: IRequest, res: Response) => {
	const { user } = req.body;
	if (!user) {
		return res.status(BAD_REQUEST).json({
			error: paramMissingError,
		});
	}
	await importCSV.update(user);
	return res.status(OK).end();
});



/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: IRequest, res: Response) => {
	const { id } = req.params;
	await importCSV.delete(Number(id));
	return res.status(OK).end();
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
