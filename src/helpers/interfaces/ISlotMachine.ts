import { IComponentConfig } from './IComponents'
import { SlotTypes } from '../enums/slotTypes'

export interface ISlotMachine extends IComponentConfig {
    reelsCount: number
    slotsCount: number
    additionalSlots: number
    defaultSlotsAmountPerSpin: number
    spinTime: number
    reelDelay: number
    reelsOffsetX: number,
    reelsOffsetY: number,
    slotWindowSizePersentage: {
        w: number
        h: number
    }
    slots: ISlotConfig
}

export interface ISlotConfig {
    fileTemplate: string
    marging: {
        x: number
        y: number
    },
    framesCount: {
        [key: number]: number
    }
}

export interface ISlot {
    type: SlotTypes
    x: number
    y: number
    w: number
    h: number
    parameters: ISlotConfig
}

export type IResult = number[][]