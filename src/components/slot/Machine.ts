import { Sprite, Texture, Container, Graphics } from "pixi.js"
import { ISlotMachine } from "../../helpers/interfaces/ISlotMachine";
import Slot from './Slot'
import { SlotTypes } from '../../helpers/enums/slotTypes';
import { Assets } from "../../helpers/enums/assets";
import Button from '../ui/Button';
import { TimelineMax, Power1 } from "gsap";

export default class Machine extends Sprite {
    private reels: Container
    private config: ISlotMachine
    private spinButton: Button

    constructor(config: ISlotMachine) {
        super(Texture.from(Assets.REELS))
        this.config = config;

        this.addChild(this.reels = this.createReels())
        // this.reels.mask = this.createMask()

        this.addSpinButton()
    }

    private createReels() {
        const reels = new Container();
        reels.x = this.config.dimensions.offsetX
        reels.y = this.config.dimensions.offsetY

        for (let row = 0; row < this.config.reelsCount; row++) {
            const rollDown = row % 2 === 0
            reels.addChild(this.createReel(row, rollDown))
        }
        return reels;
    }

    private createReel(row: number, rollDown: boolean) {
        const reel = new Container()
        const additionalSlots = this.config.hiddenSlotsCount
        reel.x = row * this.slotWidth
        for (let slotLine = 0; slotLine < this.config.slotsCount + additionalSlots; slotLine++) {
            reel.addChild(this.createSlot(rollDown ? slotLine : slotLine - additionalSlots))
        }
        return reel
    }

    private createSlot(slotLine: number, slotType = this.randomSlot) {
        const slot = new Slot({
            type: slotType,
            x: 0,
            y: slotLine * this.slotHeight,
            w: this.slotWidth,
            h: this.slotHeight,
            parameters: this.config.slots
        })
        return slot
    }

    private get slotWidth() {
        return this.texture.width * this.config.dimensions.xPersentage / this.config.reelsCount
    }

    private get slotHeight() {
        return this.texture.height * this.config.dimensions.yPersentage / this.config.slotsCount
    }

    private get randomSlot() {
        return Math.floor(Math.random() * Object.keys(SlotTypes).length / 2) + 1
    }

    private createMask(): Graphics {
        const maskSize = this.config.dimensions
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
        this.reels.children.forEach((reel, reelNumber) => {
            const direction = reelNumber % 2 === 0 ? -1 : 1
            const reelMovement = new TimelineMax();
            reelMovement.to(reel, {
                delay: reelNumber,
                y: this.slotHeight * this.config.reelSpeed * direction,
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
        reel.children.forEach((slot: Slot) => {
            if (slot.height + slot.x + this.config.slots.marging.y / 2 + reel.y <= 0) {
                slot.update(this.randomSlot, reel.children.length * this.slotHeight)
                // reel.addChild(slot)
                // slot.removeChild(slot)
                // animation.pause()
            }
        })
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