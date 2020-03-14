import { AnimatedSprite, Texture, Container } from "pixi.js"
import { SlotTypes } from "../enums/SlotTypes";
import ISlotConfig from "../interfaces/ISlotConfig";

export default class Slot extends Container {
    private animation: AnimatedSprite;
    private texture: Texture;

    constructor(config: ISlotConfig) {
        super()
        this.animation = new AnimatedSprite(this.animTextures(config.type, config.framesCount));

        this.animation.x = config.x
        this.animation.y = config.y
        this.animation.width = config.w
        this.animation.height = config.h
        this.animation.loop = false

        this.addChild(this.animation)

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', () => this.play())
    }

    private animTextures(slotType: number, framesCount = 1) {
        const animTextures = [];
        for (let i = 0; i < framesCount; i++) {
            this.texture = Texture.from(`slots/${slotType}/${i + 1}`);
            animTextures.push(this.texture);
        }
        return animTextures
    }

    public play() {
        this.animation.gotoAndPlay(1)
    }
}