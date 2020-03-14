import { Sprite, Texture, Container, Graphics } from "pixi.js"
import { IReelsConfig } from "../interfaces/IConfig";
import Slot from './Slot'
import { SlotTypes } from '../enums/SlotTypes';
import { Assets } from "../enums/Assets";
import Button from './ui/Button';

export default class Reels extends Sprite {
    private reels: Container
    private config: IReelsConfig
    private spinButton: Button

    constructor(config: IReelsConfig) {
        super(Texture.from(Assets.REELS))
        this.config = config;

        this.addChild(this.reels = this.createReels())
        this.reels.mask = this.createMask()

        this.addSpinButton()
    }

    private createReels() {
        const reels = new Container();

        const maskSize = this.config.maskSize
        reels.x = maskSize.offsetX
        reels.y = maskSize.offsetY

        const reelWidth = this.texture.width * maskSize.xPersentage / this.config.reelsCount
        const reelHeight = this.texture.height * maskSize.yPersentage / this.config.slotsCount

        for (let row = 0; row < this.config.reelsCount; row++) {
            reels.addChild(this.createReel(row, reelWidth, reelHeight))
        }
        return reels;
    }

    private createReel(row: number, reelWidth: number, reelHeight: number) {
        const reel = new Container()
        reel.x = row * reelWidth
        for (let slotLine = 0; slotLine < this.config.slotsCount + 2; slotLine++) {
            reel.addChild(this.createSlot(slotLine, reelWidth, reelHeight))
        }
        return reel
    }

    private createSlot(slotLine: number, slotWidth: number, slotHeight: number, slotType = this.randomSlot) {
        const slot = new Slot({
            type: slotType,
            x: 0,
            y: slotLine * slotWidth,
            w: slotWidth,
            h: slotHeight,
            parameters: this.config.slots
        })
        return slot
    }

    private get randomSlot() {
        return Math.floor(Math.random() * Object.keys(SlotTypes).length / 2) + 1
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

    private addSpinButton() {
        this.spinButton = new Button()
        this.spinButton.anchor.set(1, 1)
        this.spinButton.x = this.width * .985
        this.spinButton.y = this.height * .97
        this.addChild(this.spinButton)

        this.spinButton.onPress(() => this.spin())
    }

    public spin() {
        console.log(`spin`);
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