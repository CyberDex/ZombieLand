import { Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'
import Slot from './Slot'

export default class Reels extends Sprite {
    constructor(image) {
        super(Texture.EMPTY)
        this.texture = Texture.from(image)
        this.anchor.set(0.5)
        this.slot = new Slot('slot')
        this.addChild(this.slot)
    }

    resize(width, height) {
        this.position.x = width / 2
        this.position.y = height / 2

        this.height = height * .8
        this.width = this.texture.width * height / this.texture.height * .8

        if (this.width > width * .8) {
            this.width = width * .8
            this.height = this.texture.height * width / this.texture.width * .8
        }

        this.slot.resize(this.width, this.height)
    }
}