import { Sprite, Texture } from "pixi.js"

export default class Logo extends Sprite {
    constructor(bg: string) {
        super(Texture.from(bg))
        this.anchor.set(.5)
    }

    public resize(width: number, height: number) {
        this.height = height / 10
        this.width = this.texture.width * this.height / this.texture.height

        this.position.x = width / 2
        this.position.y = height / 10

        if (this.width > width * .95) {
            this.width = width * .95
            this.height = this.texture.height * this.width / this.texture.width * .95

            this.position.x = width / 2
            this.position.y = height / 7
        }
    }
}