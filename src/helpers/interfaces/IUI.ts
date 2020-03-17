import { IComponentConfig } from './IComponents'

export interface IUI extends IComponentConfig {
    buttons: {
        spin: IButtonConfig
    }
}

export interface IButtonConfig {
    default: string
    hover: string
    pressed: string
    disabled: string
}