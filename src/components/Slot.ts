import { Sprite, Texture } from "pixi.js"

export default class Slot extends Sprite {
    private sprite: Sprite;

    constructor(texture: string) {
        super(Texture.EMPTY)

        this.sprite = Sprite.from(texture)
        this.sprite.anchor.set(0.5)
        this.addChild(this.sprite)
    }

    resize(width: number, height: number) {
        this.x = width / 2
        this.y = height / 2

        // this.width = width * .2
        // this.height = height * .2
    }
}