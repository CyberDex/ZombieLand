import { Sprite, Texture, Container, Graphics } from "pixi.js"
import { ISlotMachine, IResult } from "../../helpers/interfaces/ISlotMachine";
import { SlotTypes, SpinType } from '../../helpers/enums/slotTypes';
import { TimelineMax, Power1 } from "gsap";
import Slot from './Slot'

export default class Machine extends Sprite {
    private reels: Container
    private config: ISlotMachine
    private result: IResult
    private action = false

    constructor(config: ISlotMachine) {
        super(Texture.from(config.bg))
        this.config = config;
        this.addChild(this.reels = this.createReels())
        // this.reels.mask = this.createMask()
    }

    private createReels() {
        const reels = new Container();
        reels.x = this.maskSize.x
        reels.y = this.maskSize.y
        for (let reel = 0; reel < this.config.reelsCount; reel++) {
            const rollDown = reel % 2 === 0
            reels.addChild(this.createReel(reel, rollDown))
        }
        return reels;
    }

    private createReel(row: number, rollDown: boolean) {
        const reel = new Container()
        reel.interactive = true
        reel.buttonMode = true
        reel.on('pointerdown', () => this.spin())
        reel.x = row * this.slotSize.w
        for (let slotLine = 0; slotLine < this.startSlotsCount; slotLine++) {
            const slot = this.createSlot(rollDown ? slotLine : slotLine - this.config.additionalSlots);
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
        if (this.action) { return }
        this.action = true
        this.result = undefined
        this.reels.children.forEach((reel: Container, reelNumber) => {
            const direction = reelNumber % 2 === 0 ? -1 : 1
            const newPosition = this.config.reelSpeed * this.slotSize.h * this.config.additionalSlots * this.config.spinTime * direction
            this.roll(reelNumber, newPosition, SpinType.START)
                .eventCallback("onUpdate", () => this.updateReelOnRoll(reel, direction))
                .eventCallback("onComplete", () => this.stopSpin(reelNumber))
        })
    }

    private roll(reelNumber: number, newPosition: number, type?: number): TimelineMax {
        const reelContainer = this.reels.getChildAt(reelNumber) as Container
        const reelMovement = new TimelineMax();
        const rollConfig: gsap.TweenVars = {
            delay: reelNumber * this.config.reelDelay,
            y: newPosition,
            duration: this.config.spinTime
        }
        type === SpinType.START
            ? rollConfig.ease = Power1.easeIn
            : rollConfig.ease = Power1.easeOut
        reelMovement.to(reelContainer, rollConfig)
        return reelMovement
    }

    private updateReelOnRoll(reel: Container, direction: number) {
        const newSlotsCount = reel.children.length - this.startSlotsCount
        if (direction > 0 && reel.y + this.slotSize.h * this.config.additionalSlots + 1 > this.slotSize.h * newSlotsCount) {
            const slotTyle = this.randomSlot
            reel.addChildAt(this.createSlot(-newSlotsCount, slotTyle), 0)
        } else if (reel.y < -this.slotSize.h * newSlotsCount - 1) {
            const slotTyle = this.randomSlot
            reel.addChild(this.createSlot(reel.children.length, slotTyle))
        }
    }

    private cleanUpReel(reel: Container, direction: number) {
        const newSlotsCount = reel.children.length - this.startSlotsCount
        if (direction < 0) {
            for (let i = 0; i < newSlotsCount; i++) {
                reel.removeChildAt(0)
            }
            const midSlot = reel.getChildAt(1) as Slot
            midSlot.playAnimation()
        } else {
            for (let i = 0; i < newSlotsCount; i++) {
                reel.removeChildAt(reel.children.length - 1)
            }
            const midSlot = reel.getChildAt(1 + this.config.additionalSlots) as Slot
            midSlot.playAnimation()
        }
        reel.children.forEach((slot, number) => {
            slot.y = direction < 0
                ? this.slotSize.h * number + this.config.reelsOffsetX * -1
                : (this.slotSize.h * number - this.slotSize.h * this.config.additionalSlots) + this.config.reelsOffsetX * -1
        });
        reel.y = 0
        this.action = false
    }

    private getResult(): IResult {
        return [
            [1, 1, 1],
            [2, 2, 2],
            [3, 3, 3],
            [4, 4, 4],
            [5, 5, 5]
        ]
    }

    public stopSpin(reelNumber: number) {
        this.result = this.getResult()
        const direction = reelNumber % 2 === 0 ? -1 : 1
        const reelContainer: Container = this.reels.getChildAt(reelNumber) as Container
        this.result[reelNumber].forEach(slotTyle => {
            if (direction > 0) {
                const newSlotsCount = reelContainer.children.length - this.startSlotsCount
                reelContainer.addChildAt(this.createSlot(-newSlotsCount, slotTyle), 0)
            } else {
                reelContainer.addChild(this.createSlot(reelContainer.children.length, slotTyle))
            }
        })
        for (let i = 0; i < this.config.additionalSlots; i++) {
            if (direction > 0) {
                const newSlotsCount = reelContainer.children.length - this.startSlotsCount
                reelContainer.addChildAt(this.createSlot(-newSlotsCount), 0)
            } else {
                reelContainer.addChild(this.createSlot(reelContainer.children.length))
            }
        }
        const newPosition = reelContainer.y + (this.config.reelsCount) * this.slotSize.h * direction
        this.roll(reelNumber, newPosition)
            .eventCallback("onComplete", () => this.cleanUpReel(reelContainer, direction))
    }

    private get startSlotsCount(): number {
        return this.config.slotsCount + this.config.additionalSlots
    }

    public resize(width: number, height: number) {
        this.height = height * .8
        this.width = this.texture.width * height / this.texture.height * .8

        if (this.width > width * .98) {
            this.width = width * .98
            this.height = this.texture.height * width / this.texture.width * .98
        }

        this.position.x = (width - this.width) / 2
        this.position.y = (height - this.height) / 2
    }
}