import { Request } from 'express';
import CSVDb from './ImportCSV.db';
import { IDataset } from '@entities/Company';

export interface IImportData {
	getAll: (req: Request) => Promise<IDataset>;
	add: (req: Request, dataset: IDataset) => Promise<IDataset>;
	update: (req: Request, dataset: IDataset) => Promise<IDataset>;
	// delete: (req: Request, dataset: IDataset) => Promise<IDataset>;
}

class ImportCSV extends CSVDb implements IImportData {
	// Get All Data from database
	public async getAll(req: Request): Promise<IDataset> {
		return await super.openDb(req);
	}
	
	// Add Data to database
	public async add(req: Request, dataset: IDataset): Promise<IDataset> {
		return await super.saveDb(req, dataset);
	}

	// Update Data to database
	public async update(req: Request, dataset: IDataset): Promise<IDataset> {
		return await super.saveDb(req, dataset);
	}
	
	// Delete a Data in database
	// public async delete<T>(req: Request): Promise<T> {
	// 	return await super.openDb<T>(req);
	// }
}

export default ImportCSV;