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
        this.animation.anchor.set(0.5)
    }

    public play() {
        this.animation.play();
    }

    public resize(width: number) {
        this.width = width * .17
        this.height = this.texture.height * width / this.texture.width * .17
    }
}