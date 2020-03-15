import { Sprite, Texture } from "pixi.js"
import { Assets } from "../../helpers/enums/assets";

export default class Button extends Sprite {
    private activness = false;

    constructor() {
        super(Texture.from(Assets.SPIN_BUTTON_DEFAULT))
        this.active = true
        this
            .on('pointerdown', () => this.texture = Texture.from(Assets.SPIN_BUTTON_PRESSED))
            .on('pointerup', () => this.texture = Texture.from(Assets.SPIN_BUTTON_HOVER))
            .on('pointerupoutside', () => this.texture = Texture.from(Assets.SPIN_BUTTON_DEFAULT))
            .on('pointerover', () => this.texture = Texture.from(Assets.SPIN_BUTTON_HOVER))
            .on('pointerout', () => this.texture = Texture.from(Assets.SPIN_BUTTON_DEFAULT))
    }

    public onPress(event: () => void) {
        this.on('pointerdown', event)
    }

    public set active(active: boolean) {
        if (this.activness === active) { return; }
        this.activness = active
        this.interactive = active
        this.buttonMode = active
        this.texture = Texture.from(active ? Assets.SPIN_BUTTON_DEFAULT : Assets.SPIN_BUTTON_DISABLED)
    }

    public get active() {
        return this.activness
    }

    public resize(width: number, height: number) {
        this.height = height / 10
        this.width = this.texture.width * this.height / this.texture.height

        this.position.x = width / 2
        this.position.y = height / 12

        if (this.width > width * .95) {
            this.width = width * .95
            this.height = this.texture.height * this.width / this.texture.width * .95

            this.position.x = width / 2
            this.position.y = height / 6
        }
    }
}