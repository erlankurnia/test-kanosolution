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
		this.allData = {
			header: [],
			data: [],
			rowsCount: 0,
			columnsCount: 0,
			message: ''
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
			const data: string = await res.text();
			const rows: string[] = data.split('\n');
			
			for (let h = 0; h < rows.length; h++) {
				let row: string[] = [];
				let col: string[] = [];
				row = rows[h].split(this.pattern);
			
				for(let i = 0; i < row.length; i++) {
					if (i % 2 != 0) {
						row[i] = row[i].replace(/^\s|\s$|\r$/, '');
						if (i <= 2 && col.length < 2) {
							col[0] = row[i].split('"').join('');
						} else {
							col.push(row[i].split('"').join(''));
						}
					}
				}
				if (h == 0) {
					this.allData.header.push(...col);
				} else {
					this.allData.data.push(col);
				}
			}
			this.allData.rowsCount = this.allData.data.length;
			this.allData.columnsCount = this.allData.header.length;
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
