import { Sprite, Texture, Container, Graphics } from 'pixi.js'
import { ISlotMachine, IResult } from '../../helpers/interfaces/ISlotMachine'
import { SlotTypes, SpinType } from '../../helpers/enums/slotTypes'
import { TimelineMax, Power1 } from 'gsap'
import Slot from './Slot'
import { store } from '../../redux/store'
import { stopSpin } from '../../redux/actions';

export default class Machine extends Sprite {
    private config: ISlotMachine
    private reels: Container
    private actions: number[] = []
    private stopReel: number[] = []
    private debug = false

    constructor(config: ISlotMachine) {
        super(Texture.from(config.bg))
        this.config = config
        this.reels = this.createReels()
        if (!this.debug) {
            this.reels.mask = this.createMask()
        }
        this.addChild(this.reels)
        store.subscribe(() =>
            store.getState().spin
                ? this.spin(this.config.defaultSlotsAmountPerSpin)
                : this.stopAll()
        )
    }

    private createReels() {
        const reels = new Container()
        reels.x = this.maskSize.x
        reels.y = this.maskSize.y
        for (let reelNumber = 0; reelNumber < this.config.reelsCount; reelNumber++) {
            this.makeButton(reelNumber, () => this.stopReel[reelNumber] = 2)
            const rollDown = reelNumber % 2 === 0
            reels.addChild(
                this.createReel(reelNumber, rollDown)
            )
        }
        return reels
    }

    private createReel(reelNumber: number, rollDown: boolean) {
        const reel = new Container()
        reel.x = reelNumber * this.slotSize.w
        for (let slotLine = 0; slotLine < this.startSlotsCount; slotLine++) {
            reel.addChild(
                this.createSlot(rollDown ? slotLine : slotLine - this.config.additionalSlots)
            )
        }
        return reel
    }

    private makeButton(reelNumber: number, callback: () => void) {
        const button = new Graphics()
        button.beginFill(0x000000)
        button.drawRect(
            this.maskSize.x + reelNumber * this.slotSize.w + 25,
            this.maskSize.y,
            this.slotSize.w,
            this.slotSize.h * this.config.slotsCount)
        button.endFill()
        button.alpha = 0
        button.interactive = true
        button.on('pointerdown', callback)
        this.addChild(button)
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

    private get slotSize(): { w: number, h: number } {
        const w = this.maskSize.w / this.config.reelsCount
        const h = this.maskSize.h / this.config.slotsCount
        return { w, h }
    }

    private get randomSlot() {
        return Math.floor(Math.random() * Object.keys(SlotTypes).length / 2) + 1
    }

    private get maskSize(): { x: number, y: number, w: number, h: number } {
        const maskSize = this.config.slotWindowSizePersentage
        const w = this.texture.width * (maskSize.w / 100)
        const h = this.texture.height * (maskSize.h / 100) + this.config.reelsOffsetY
        const x = (this.texture.width - w) / 3
        const y = (this.texture.height - h) / 2 + this.config.reelsOffsetX
        return { x, y, w, h }
    }

    private createMask(): Graphics {
        const mask = new Graphics()
        mask.beginFill(0x000000)
        mask.drawRect(this.maskSize.x, this.maskSize.y, this.maskSize.w, this.maskSize.h)
        mask.endFill()
        this.addChild(mask)
        return mask
    }

    public spin(sinSlots: number) {
        if (this.actions.length > 0) { return }
        this.stopReel = []
        let activeReels = this.config.reelsCount
        this.reels.children.forEach((reel: Container, reelNumber) => {
            const animation: TimelineMax = this.roll(reelNumber, sinSlots)
                .eventCallback('onUpdate', () => this.updateReelOnRoll(reelNumber, animation))
                .eventCallback('onComplete', () => {
                    this.cleanUpReel(reelNumber);
                    activeReels--
                    activeReels === 0 && store.dispatch(stopSpin())
                })
        })
    }

    public stopAll() {
        if (this.actions.length <= 0) { return }
        this.stopReel = [2, 2, 2, 2, 2]
    }

    private roll(reelNumber: number, slotsCount: number, type?: number): TimelineMax {
        this.actions[reelNumber] = slotsCount
        const direction = reelNumber % 2 === 0 ? -1 : 1
        const reelContainer = this.reels.getChildAt(reelNumber) as Container
        let newPosition = this.slotSize.h * (slotsCount) * direction
        if (direction < 0) {
            newPosition = this.slotSize.h * (slotsCount + this.config.slotsCount) * direction
        }
        const reelMovement = new TimelineMax()
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

    private updateReelOnRoll(reelNumber: number, animation: TimelineMax) {
        const direction = reelNumber % 2 === 0 ? -1 : 1
        const reelContainer: Container = this.reels.getChildAt(reelNumber) as Container
        const newSlotsCount = reelContainer.children.length - this.startSlotsCount

        let slotPosition

        if (direction > 0 && reelContainer.y + this.slotSize.h * this.config.additionalSlots + 1 > this.slotSize.h * newSlotsCount) {
            slotPosition = -newSlotsCount
            if (this.stopReel[reelNumber] !== undefined && this.stopReel[reelNumber] === -1 - this.config.additionalSlots) {
                animation.pause()
                this.cleanUpReel(reelNumber)
                return
            }
            reelContainer.addChildAt(this.createSlot(slotPosition, this.getSlotType(reelNumber)), 0)
        } else if (reelContainer.y < -this.slotSize.h * newSlotsCount - 1) {
            slotPosition = reelContainer.children.length
            if (this.stopReel[reelNumber] !== undefined && this.stopReel[reelNumber] === -1 - this.config.additionalSlots) {
                animation.pause()
                this.cleanUpReel(reelNumber)
                return
            }
            reelContainer.addChild(this.createSlot(slotPosition, this.getSlotType(reelNumber)))
        }
    }

    private getSlotType(reelNumber: number) {
        let slotType
        if (this.stopReel[reelNumber] !== undefined) {
            this.stopReel[reelNumber]--
            slotType = this.getResult()[reelNumber][this.stopReel[reelNumber] + 1]
        } else if (this.actions[reelNumber] <= this.config.slotsCount) {
            slotType = this.getResult()[reelNumber][this.actions[reelNumber]]
        }
        this.actions[reelNumber]--
        return slotType
    }

    private cleanUpReel(reelNumber: number) {
        const direction = reelNumber % 2 === 0 ? -1 : 1
        const reelContainer: Container = this.reels.getChildAt(reelNumber) as Container
        const newSlotsCount = reelContainer.children.length - this.startSlotsCount
        if (direction < 0) {
            for (let i = 0; i < newSlotsCount; i++) {
                reelContainer.removeChildAt(0)
            }
            const midSlot = reelContainer.getChildAt(1) as Slot
            midSlot.playAnimation()
        } else {
            for (let i = 0; i < newSlotsCount; i++) {
                reelContainer.removeChildAt(reelContainer.children.length - 1)
            }
            const midSlot = reelContainer.getChildAt(1 + this.config.additionalSlots) as Slot
            midSlot.playAnimation()
        }
        reelContainer.children.forEach((slot, number) => {
            slot.y = direction < 0
                ? this.slotSize.h * number + this.config.reelsOffsetX * -1
                : (this.slotSize.h * number - this.slotSize.h * this.config.additionalSlots) + this.config.reelsOffsetX * -1
        })
        this.actions[reelNumber] = 0
        if (this.actions.reduce((a, b) => a + b) <= 0) {
            this.actions = []
        }
        reelContainer.y = 0
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
        this.debug
            ? this.position.y = (height - this.height) / 2
            : this.position.y = (height - this.height) / 1.5
    }
}