import { Sprite, Texture } from 'pixi.js'

export default class BG extends Sprite {
    constructor(image: string) {
        super(Texture.from(image))
        this.anchor.set(.5)
    }

    resize(width: number, height: number) {
        this.position.x = width * .5
        this.position.y = height * .5

        this.height = height
        this.width = this.texture.width * height / this.texture.height

        if (this.width < width) {
            this.width = width
            this.height = this.texture.height * width / this.texture.width
        }
    }
}