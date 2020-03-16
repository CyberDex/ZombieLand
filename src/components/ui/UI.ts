import { Sprite, Texture, Application } from 'pixi.js';
import Button from '../../components/ui/Button';
import { IUI } from '../../helpers/interfaces/IUI';

export default class UI extends Sprite {
    private spinButton: Button
    private config: IUI
    private application: Application

    constructor(config: IUI, application: Application, ) {
        super(Texture.from(config.ui))
        this.config = config
        this.application = application
        this.spinButton = this.addSpinButton()
    }

    private addSpinButton() {
        const spinButton = new Button(this.config.buttons.spin)
        spinButton.anchor.set(1, 1)
        this.addChild(spinButton)
        spinButton.x = this.width
        spinButton.y = this.height
        // this.spinButton.onPress(() => this.spin())
        return spinButton
    }

    resize(width: number, height: number) {
        this.height = height * .8
        this.width = this.texture.width * height / this.texture.height * .8

        if (this.width > width * .953) {
            this.width = width * .953
            this.height = this.texture.height * width / this.texture.width * .953
        }

        this.position.x = (width - this.width) / 2
        this.position.y = (height - this.height) / 1.2 + 5
    }
}