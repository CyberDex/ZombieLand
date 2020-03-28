import { IResult } from './ISlotMachine';

export default interface IAppState {
    spin: boolean;
    result: IResult | undefined;
}