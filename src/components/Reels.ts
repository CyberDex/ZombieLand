import { Sprite, Texture, Container, Graphics } from "pixi.js"
import { IReelsConfig } from "../interfaces/IConfig";
import Slot from './Slot'

export default class Reels extends Sprite {
    private reals: Container;
    private realsMask: Graphics;
    private config: IReelsConfig;

    constructor(config: IReelsConfig) {
        super(Texture.from(config.bg))
        this.config = config;

        this.realsMask = this.createMask(0, 0, this.texture.width, this.texture.height)

        this.reals = new Container();

        for (let i = 0; i < config.reelsCount; i++) {
            const reel = new Container()
            for (let i = 0; i < config.slotsCount; i++) {
                const slot = new Slot("5", 30)
                // slot.mask = this.realsMask
                reel.addChild(slot)
            }
            this.reals.addChild(reel)
        }
    }

    private createMask(x: number, y: number, w: number, h: number): Graphics {
        const realsMask = new Graphics();
        realsMask.beginFill(0x000000);
        realsMask.drawRect(x, y, w, h);
        realsMask.endFill();
        // this.addChild(realsMask)
        return realsMask
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

        const maskSize = this.config.maskSize
        this.realsMask.width = this.texture.width * maskSize.xPersentage
        this.realsMask.height = this.texture.height * maskSize.yPersentage

        this.realsMask.x = maskSize.offsetX
        this.realsMask.y = maskSize.offsetY
    }
}