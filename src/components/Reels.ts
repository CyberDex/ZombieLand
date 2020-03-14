import { Sprite, Texture, Container, Graphics } from "pixi.js"
import { IReelsConfig } from "../interfaces/IConfig";
import Slot from './Slot'
import { SlotTypes } from '../enums/SlotTypes';
import { Assets } from "../enums/Assets";

export default class Reels extends Sprite {
    private reels: Container;
    private realsMask: Graphics;
    private config: IReelsConfig;

    constructor(config: IReelsConfig) {
        super(Texture.from(Assets.REELS))
        this.config = config;
        this.reels = this.createReels()
        this.reels.mask = this.createMask()
        this.addChild(this.reels)
    }

    private createMask(): Graphics {
        const maskSize = this.config.maskSize
        const mask = new Graphics();
        mask.beginFill(0x000000);
        mask.drawRect(
            maskSize.offsetX,
            maskSize.offsetY,
            this.texture.width * maskSize.xPersentage,
            this.texture.height * maskSize.yPersentage);
        mask.endFill();
        this.addChild(mask)
        return mask
    }

    private createReels() {
        const reels = new Container();

        const maskSize = this.config.maskSize
        reels.x = maskSize.offsetX
        reels.y = maskSize.offsetY
        console.log();

        for (let x = 0; x < this.config.reelsCount; x++) {
            const reel = new Container()
            const slotWidth = this.texture.width * maskSize.xPersentage / this.config.reelsCount
            const slotHeight = this.texture.height * maskSize.yPersentage / this.config.slotsCount
            reel.x = x * slotWidth
            for (let y = 0; y < this.config.slotsCount; y++) {
                const slotType = this.rundomSlot;
                const slot = new Slot({
                    type: slotType,
                    x: 0,
                    y: y * slotHeight,
                    w: slotWidth,
                    h: slotHeight,
                    parameters: this.config.slots
                })
                reel.addChild(slot)
            }
            reels.addChild(reel)
        }
        return reels;
    }

    private get rundomSlot() {
        return Math.floor(Math.random() * Object.keys(SlotTypes).length / 2) + 1
    }

    public resize(width: number, height: number) {
        this.height = height * .8
        this.width = this.texture.width * height / this.texture.height * .8

        this.position.x = (width - this.width) / 2
        this.position.y = (height - this.height) / 1.14

        if (this.width > width * .98) {
            this.width = width * .98
            this.height = this.texture.height * width / this.texture.width * .98

            this.position.x = (width - this.width) / 2
            this.position.y = (height - this.height) / 1.5
        }
    }
}