import { Sprite, Texture } from 'pixi.js'

export default class Logo extends Sprite {
    constructor(image: string) {
        super(Texture.from(image))
        this.anchor.set(.5)
    }

    public resize(width: number, height: number) {
        this.height = height * .1
        this.width = this.texture.width * this.height / this.texture.height

        this.position.x = width * .5
        this.position.y = height * .08

        if (this.width > width * .95) {
            this.width = width * .95
            this.height = this.texture.height * this.width / this.texture.width * .95

            this.position.y = height * .2
        }
    }
}