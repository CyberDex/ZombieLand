import { IComponentConfig } from "./IComponents"
import { SlotTypes } from '../enums/slotTypes'

export interface ISlotMachine extends IComponentConfig {
    reelsCount: number
    slotsCount: number
    hiddenSlotsCount: number
    reelSpeed: number
    spinTime: number
    slotsAssets?: {
        filesCount: number
        urlTemplate: string
    },
    dimensions: {
        xPersentage: number
        yPersentage: number
        offsetX: number
        offsetY: number
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