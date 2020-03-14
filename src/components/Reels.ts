import { Sprite, Texture, Container } from "pixi.js"
import Slot from './Slot'

export default class Reels extends Sprite {
    private reals: Container;

    constructor(config: {
        bg: string;
        reelsCount: number;
        slotsCount: number;
    }) {
        super(Texture.from(config.bg))

        this.reals = new Container();

        for (let i = 0; i < config.reelsCount; i++) {
            const reel = new Container()
            for (let i = 0; i < config.slotsCount; i++) {
                const slot = new Slot("5", 30)
                reel.addChild(slot)
            }
            this.reals.addChild(reel)
        }
    }

    public resize(width: number, height: number) {
        this.height = height * .8
        this.width = this.texture.width * height / this.texture.height * .8

        this.position.x = (width - this.width) / 2
        this.position.y = (height - this.height) / 1.14

        if (this.width > width * .95) {
            this.width = width * .95
            this.height = this.texture.height * width / this.texture.width * .95

            this.position.x = (width - this.width) / 2
            this.position.y = (height - this.height) / 1.6
        }
    }
}