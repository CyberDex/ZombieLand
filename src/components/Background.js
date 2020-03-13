import { Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'

export default class Background extends Sprite {
    constructor(image) {
        super(Texture.EMPTY)
        this.texture = Texture.from(image)
        this.anchor.set(0.5)
    }

    resize(width, height) {
        this.position.x = width / 2
        this.position.y = height / 2

        this.height = height
        this.width = this.texture.width * height / this.texture.height

        if (this.width < width) {
            this.width = width
            this.height = this.texture.height * width / this.texture.width
        }
    }
}