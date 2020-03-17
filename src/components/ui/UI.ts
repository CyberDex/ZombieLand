import { Sprite, Texture, Application } from 'pixi.js'
import { IUI } from '../../helpers/interfaces/IUI'
import Button from '../../components/ui/Button'
import EventsController from '../../controllers/EventsController'
import { Events } from '../../helpers/enums/events'

export default class UI extends Sprite {
    private spinButton: Button
    private config: IUI

    constructor(config: IUI, application: Application, ) {
        super(Texture.from(config.ui))
        this.config = config
        this.spinButton = this.addSpinButton()
        this.spinButton.onPress(() => EventsController.instance.emit(Events.SPIN))
    }

    private addSpinButton() {
        const spinButton = new Button(this.config.buttons.spin)
        spinButton.anchor.set(1, 1)
        this.addChild(spinButton)
        spinButton.x = this.width
        spinButton.y = this.height
        return spinButton
    }

    resize(width: number, height: number) {
        this.height = height * .8
        this.width = this.texture.width * height / this.texture.height * .8

        if (this.width > width * .953) {
            this.width = width * .953
            this.height = this.texture.height * width / this.texture.width * .953
        }

        this.position.x = (width - this.width) * .5
        this.position.y = (height - this.height) / 1.5 + 5 //TODO: create better positioning calulation
    }
}