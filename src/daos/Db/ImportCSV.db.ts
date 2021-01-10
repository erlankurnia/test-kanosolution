/* eslint-disable prefer-const */
import fetch from 'node-fetch';
import fs from 'fs';
import { Request } from 'express';
import { IDataset } from '@entities/Company';

abstract class CSVDb {
	private allData: IDataset;
	private readonly dbFilePath = 'test.100.row.csv';
	// private readonly dbFilePath = 'companies.csv';
	private pattern = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/;

	constructor() {
		this.allData =  {
			header: [],
			data: [],
			entries: 0,
			totalEntries: 0,
			field: 0,
			message: '',
			page: 1,
			perPage: 50
		};
	}

	private resetData(): IDataset {
		return {
			header: [],
			data: [],
			entries: 0,
			totalEntries: 0,
			field: 0,
			message: (this.allData.message == '') ? '' : this.allData.message,
			page: 1,
			perPage: 50
		};
	}

	// Read Database
	protected async openDb(req: Request): Promise<IDataset> {
		const url: string = this.getUrl(this.dbFilePath, req);
		const res = await fetch(url).then(res => {
			if (res.ok) {
				this.allData.message = 'Read successully!';
			} else {
				this.allData.message = 'Read failed!';
			}
			return res;
		});

		if (res.ok) {
			this.allData = this.resetData();
			const data: string = await res.text();
			const rows: string[] = data.split('\n');
			this.allData.page = parseInt(req.query.page as string || '1');
			this.allData.perPage = parseInt(req.query.perPage as string || '50');
			const start: number = (this.allData.page - 1) * this.allData.perPage + 1;
			const limit: number =
				(start + this.allData.perPage > rows.length) 
					? rows.length : start + this.allData.perPage;
			
			// Add Header
			const col = rows[0].split(this.pattern);

			for(let i = 0; i < col.length; i++) {
				if (i % 2 != 0) {
					col[i] = col[i].replace(/^\s|\s$|\r$/, '');
					this.allData.header.push(col[i].split('"').join(''));
				}
			}
			
			// Add data
			for (let h = start; h < limit; h++) {
				let row: string[] = [];
				let col: string[] = [];
				row = rows[h].split(this.pattern);
			
				for(let i = 0; i < row.length; i++) {
					if (i % 2 != 0) {
						row[i] = row[i].replace(/^\s|\s$|\r$/, '');
						col.push(row[i].split('"').join(''));
					}
				}
				
				this.allData.data.push(col);
			}

			// Add Header Count
			this.allData.field = this.allData.header.length;
			// Add Total Data Count
			this.allData.totalEntries = rows.length - 1;
			// Add Data Count
			this.allData.entries = this.allData.data.length;
		}

		return Promise.resolve(this.allData);
	}

	// Write Database
	protected async saveDb(req: Request, data: IDataset): Promise<IDataset> {
		let dataset = data.header.join(',') + `\n`;

		data.data.forEach(row => {
			row.forEach(col => {
				if (col.indexOf(',') != -1) {
					dataset += '"' + col + '",';
				} else {
					dataset += col + ',';
				}
			});
			dataset += `\n`;
		});
		
		fs.writeFile(process.cwd() + '/src/public/' + this.dbFilePath + '.csv', dataset, (err) => {
			if (err) {
				this.allData.message = err.message;
			} else {
				this.allData.message= "Written successfully!";
			}
		});

		return Promise.resolve(this.allData);
	}

	// Get Absolute URL
	private getUrl(path: string, req: Request): string {
		return req.protocol + '://' + req.get('host') + '/' + path;
	}
}

export default CSVDb;
