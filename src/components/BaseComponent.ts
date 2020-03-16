import { Sprite, Texture, ISize } from "pixi.js"
import { fit } from "../helpers/fit"
import { IComponentConfig } from "../helpers/interfaces/IComponents"

export default class BaseComponent extends Sprite {
    public config: IComponentConfig

    constructor(config: IComponentConfig) {
        super(Texture.from(config.texture))
        this.config = config
        this.resize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    public resize(size: ISize) {
        fit(this, size, this.config.pos)
    }
}