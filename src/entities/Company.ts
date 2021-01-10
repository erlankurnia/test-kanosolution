export interface ICompany {
  field: number;
  id: number;
  value: string | number;
}

class Company {
	public data: string[];

	constructor(data: string[]) {
    this.data = data;
	}
}

type obj = string | number;

export interface ICompanies {
	companies: obj[];
}

export interface IDataset extends Object {
	header: string[];
	data: string[][];
	entries: number;
	totalEntries: number;
	field: number;
	message: string;
	page: number;
	perPage: number;
}

export default Company;
