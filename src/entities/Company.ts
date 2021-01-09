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

export interface IDataset {
	header: string[];
	data: string[][];
	rowsCount: number;
	columnsCount: number;
	message: string;
}

export default Company;
