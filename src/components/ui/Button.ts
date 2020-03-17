import { Sprite, Texture } from 'pixi.js'
import { IButtonConfig } from '../../helpers/interfaces/IUI'

export default class Button extends Sprite {
    private activness = false
    private config: IButtonConfig

    constructor(config: IButtonConfig) {
        super(Texture.from(config.default))
        this.config = config
        this.active = true
        this
            .on('pointerdown', () => this.texture = Texture.from(config.pressed))
            .on('pointerup', () => this.texture = Texture.from(config.default))
            .on('pointerupoutside', () => this.texture = Texture.from(config.default))
            .on('pointerout', () => this.texture = Texture.from(config.default))
            .on('pointerover', () => this.texture = Texture.from(config.hover))
    }

    public onPress(event: () => void) {
        this.on('pointerdown', event)
    }

    public set active(active: boolean) {
        if (this.activness === active) { return }
        this.activness = active
        this.interactive = active
        this.buttonMode = active
        this.texture = Texture.from(active ? this.config.default : this.config.disabled)
    }

    public get active() {
        return this.activness
    }

    public resize(width: number, height: number) {
        this.height = height / 10
        this.width = this.texture.width * this.height / this.texture.height

        this.position.x = width / 2
        this.position.y = height / 12

        // if (this.width > width * .95) {
        //     this.width = width * .95
        //     this.height = this.texture.height * this.width / this.texture.width * .95

        //     this.position.x = width / 2
        //     this.position.y = height / 6
        // }
    }
}