import { SlotTypes } from '../enums/SlotTypes';
export default interface ISlotConfig {
    type: SlotTypes;
    x: number;
    y: number;
    w: number;
    h: number;
    framesCount: number;
}