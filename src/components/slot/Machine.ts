import { Sprite, Texture, Container, Graphics } from "pixi.js"
import { ISlotMachine } from "../../helpers/interfaces/ISlotMachine";
import { SlotTypes } from '../../helpers/enums/slotTypes';
import { TimelineMax, Power1 } from "gsap";
import Slot from './Slot'

export default class Machine extends Sprite {
    private reels: Container
    private config: ISlotMachine

    constructor(config: ISlotMachine) {
        super(Texture.from(config.bg))
        this.config = config;

        this.addChild(this.reels = this.createReels())
        this.reels.mask = this.createMask()
    }

    private createReels() {
        const reels = new Container();
        reels.x = this.maskSize.x
        reels.y = this.maskSize.y
        for (let row = 0; row < this.config.reelsCount; row++) {
            const rollDown = row % 2 === 0
            reels.addChild(this.createReel(row, rollDown))
        }
        return reels;
    }

    private createReel(row: number, rollDown: boolean) {
        const reel = new Container()
        reel.interactive = true
        reel.buttonMode = true
        reel.on('pointerdown', () => this.spin())
        const additionalSlots = this.config.hiddenSlotsCount
        reel.x = row * this.slotSize.w
        for (let slotLine = 0; slotLine < this.config.slotsCount + additionalSlots; slotLine++) {
            const slot = this.createSlot(rollDown ? slotLine : slotLine - additionalSlots);
            reel.addChild(slot)
        }
        return reel
    }

    private createSlot(slotLine: number, slotType = this.randomSlot) {
        const slot = new Slot({
            type: slotType,
            x: 0,
            y: slotLine * this.slotSize.h,
            w: this.slotSize.w,
            h: this.slotSize.h,
            parameters: this.config.slots
        })
        return slot
    }

    private get slotSize(): { w: number; h: number } {
        const w = this.maskSize.w / this.config.reelsCount
        const h = this.maskSize.h / this.config.slotsCount
        return { w, h }
    }

    private get randomSlot() {
        return Math.floor(Math.random() * Object.keys(SlotTypes).length / 2) + 1
    }

    private get maskSize(): { x: number; y: number, w: number; h: number } {
        const maskSize = this.config.slotWindowSizePersentage
        const w = this.texture.width * (maskSize.w / 100)
        const h = this.texture.height * (maskSize.h / 100) + this.config.reelsOffsetY
        const x = (this.texture.width - w) / 3
        const y = (this.texture.height - h) / 2 + this.config.reelsOffsetX
        return { x, y, w, h }
    }

    private createMask(): Graphics {
        const mask = new Graphics();
        mask.beginFill(0x000000);
        mask.drawRect(this.maskSize.x, this.maskSize.y, this.maskSize.w, this.maskSize.h);
        mask.endFill();
        this.addChild(mask)
        return mask
    }

    public spin() {
        this.reels.children.forEach((reel, reelNumber) => {
            const direction = reelNumber % 2 === 0 ? -1 : 1
            const reelMovement = new TimelineMax();
            reelMovement.to(reel, {
                delay: reelNumber * .2,
                y: this.slotSize.h * this.config.reelSpeed * direction,
                duration: this.config.spinTime,
                ease: Power1.easeIn,
                onUpdate: () => {
                    direction > 0
                        ? this.updateSlotsGoDown(reel as Container, reelMovement)
                        : this.updateSlotsGoUp(reel as Container, reelMovement)
                }
            })
        })
    }

    private updateSlotsGoUp(reel: Container, animation: TimelineMax) {
        // reel.children.forEach((slot: Slot) => {
        //     if (slot.height + slot.x + this.config.slots.marging.y / 2 + reel.y <= 0) {
        // slot.update(this.randomSlot, reel.children.length * this.slotSize.h)
        // reel.addChild(slot)
        // slot.removeChild(slot)
        // animation.pause()
        // }
        // })
    }

    private updateSlotsGoDown(reel: Container, animation: TimelineMax) {
        // reel.children.forEach((slot: Sprite) => {
        //     if (slot.y >= 0) {
        //         slot.y = -slot.height
        //     }
        // })
    }

    public resize(width: number, height: number) {
        this.height = height * .8
        this.width = this.texture.width * height / this.texture.height * .8

        if (this.width > width * .98) {
            this.width = width * .98
            this.height = this.texture.height * width / this.texture.width * .98
        }

        this.position.x = (width - this.width) / 2
        this.position.y = (height - this.height) / 1.2
    }
}