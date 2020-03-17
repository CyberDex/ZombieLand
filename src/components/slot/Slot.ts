import { AnimatedSprite, Texture, Sprite } from 'pixi.js'
import { ISlot } from '../../helpers/interfaces/ISlotMachine'

export default class Slot extends Sprite {
    public config: ISlot
    private animation: AnimatedSprite

    constructor(config: ISlot) {
        super(Texture.from(config.parameters.fileTemplate + config.type))
        this.config = config

        const marginX = config.parameters.marging.x
        const marginY = config.parameters.marging.y
        this.x = config.x + marginX
        this.y = config.y + marginY
        this.width = config.w - marginX
        this.height = config.h - marginY

        this.animation = this.addAnimation(config)
        this.addChild(this.animation)
    }

    private addAnimation(config: ISlot) {
        const animation = new AnimatedSprite(this.animTextures(
            config.parameters.fileTemplate + 'anim/' + config.type,
            config.parameters.framesCount[config.type]
        ))
        animation.loop = false
        animation.alpha = 0
        animation.anchor.set(.5)
        animation.x = this.width / 2 + 8
        animation.y = this.height / 2
        return animation
    }

    private animTextures(slotType: string, framesCount = 1) {
        // TODO: change this to PIXI.Loader.shared.resources["assets/spritesheet.json"].spritesheet;
        // sheet.animations["image_sequence"]
        const animTextures = []
        for (let i = 0; i < framesCount; i++) {
            animTextures.push(Texture.from(`${slotType}/${i + 1}`))
        }
        return animTextures
    }

    public playAnimation() {
        this.animation.alpha = 1
        this.animation.gotoAndPlay(1)
        this.animation.onComplete = () => {
            this.animation.alpha = 0
        }
    }
}