import { IResult } from './ISlotMachine';
import { Actions } from '../../redux/actionTypes';

export interface IAppState {
    spin?: boolean;
    result?: IResult | undefined;
}

export interface IAction extends IAppState {
    type: Actions
}