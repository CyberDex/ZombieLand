import { Texture } from '@pixi/core'
import { TilingSprite } from '@pixi/sprite-tiling'

export default class TilingSprite extends TilingSprite {
    constructor(texture) {
        const texture = Texture.from(texture)
        super(texture, 1, texture.height)
    }

    onResize(width, height) {
        this.width = width
    }

    onUpdate(delta) {
        this.tilePosition.x -= delta * 4
    }
}