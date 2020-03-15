import { Components } from "../enums/components";
import { Container } from "pixi.js";

export interface IComponentsConfig {
    [key: string]: IComponentConfig
}

export interface IComponentConfig {
    [key: string]: any
}

export interface IComponentsList {
    [key: string]: Container
}