import { Texture, TilingSprite } from "pixi.js"

export default class TSprite extends TilingSprite {
    constructor(texture: string) {
        super(Texture.EMPTY)
        this.texture = Texture.from(texture)
    }

    onResize(width: number, height: number) {
        this.width = width
    }

    onUpdate(delta: number) {
        this.tilePosition.x -= delta * 4
    }
}