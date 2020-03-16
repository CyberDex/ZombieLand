import { IComponentConfig } from "../../helpers/interfaces/IComponents"
import { ISize } from "pixi.js"
import { fill } from "../../helpers/fit"
import BaseComponent from "../BaseComponent"

export default class BG extends BaseComponent {
    constructor(config: IComponentConfig) {
        super(config)
        this.anchor.set(0.5)
    }

    public resize(size: ISize) {
        fill(this, size)
    }
}