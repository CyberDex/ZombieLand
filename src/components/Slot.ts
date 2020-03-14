import { AnimatedSprite, Texture, Container } from "pixi.js"

export default class Slot extends Container {
    private animation: AnimatedSprite;
    private texture: Texture;

    constructor(slot: string, framesCount = 1) {
        super()
        const animTextures = [];
        for (let i = 0; i < framesCount; i++) {
            this.texture = Texture.from(`slots/${slot}/${i + 1}`);
            animTextures.push(this.texture);
        }
        this.animation = new AnimatedSprite(animTextures);
        this.addChild(this.animation)
    }

    public play() {
        this.animation.play();
    }

    public resize(width: number, position: number) {
        this.width = width * .1735
        this.height = this.texture.height * width / this.texture.width * .1735

        // mask
        const maskWidth = width * .9149
        this.x = maskWidth / 5
    }
}