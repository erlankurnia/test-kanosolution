import { Request } from 'express';
import { IUser } from '@entities/User';
import { IDataset } from '@entities/Company';


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequestCompany extends Request {
    body: {
        dataset: IDataset;
    }
}

export interface IRequest extends Request {
    body: {
        user: IUser;
    }
} 
