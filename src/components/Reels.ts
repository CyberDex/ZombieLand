import { Sprite, Texture, Container } from "pixi.js"
import Slot from './Slot'

export default class Reels extends Container {
    private texture: Texture;
    private bg: Sprite;
    private slot: Slot;

    constructor(image: string) {
        super()

        this.texture = Texture.from(image)
        this.bg = new Sprite(this.texture)
        this.bg.anchor.set(0.5)
        this.addChild(this.bg)

        this.slot = new Slot("5", 30)
        this.addChild(this.slot)
    }

    public resize(width: number, height: number) {
        this.position.x = width / 2
        this.position.y = height / 2 * 1.14

        this.bg.height = height * .8
        this.bg.width = this.texture.width * height / this.texture.height * .8

        if (this.bg.width > width * .95) {
            this.bg.width = width * .95
            this.bg.height = this.texture.height * width / this.texture.width * .95
        }

        this.slot.resize(this.bg.width)
    }
}