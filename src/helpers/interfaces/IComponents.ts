import { Components } from "../enums/components";
import { Container } from "pixi.js";

export interface IComponentsConfig {
    [key: string]: IComponentConfig
}

export interface IComponentConfig {
    texture?: string
    pos?: IPos
    [key: string]: any
}

export interface IComponentsList {
    [type: string]: {
        elements?: Container[]
    }
}

export interface IPos {
    pos: {
        lanscape: {
            maxHeight: number
            posX: number
            posY: number
        },
        portrait: {
            maxWidth: number
            posX: number
            posY: number
        }
    }
}