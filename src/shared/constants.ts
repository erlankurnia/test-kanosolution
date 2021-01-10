import { Request } from 'express';
import { IDataset } from '@entities/Company';


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequestCompany extends Request {
    body: {
        dataset: IDataset;
    }
}
