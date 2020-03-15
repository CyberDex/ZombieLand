import { Components } from "../enums/components";

export interface IComponentsConfig {
    [key: string]: IComponentConfig
}

export interface IComponentConfig {
    assets?: string[]
    [key: string]: any
}

export type IComponentsList = {
    [key in Components]: any
}

export interface IComponent {
    name: Components
    components?: IComponent
}