import { SlotTypes } from '../enums/SlotTypes';
import { ISlotConfig } from './IConfig';

export default interface ISlot {
    type: SlotTypes;
    x: number;
    y: number;
    w: number;
    h: number;
    parameters: ISlotConfig;
}