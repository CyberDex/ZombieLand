import Button from '../../components/ui/Button';
import { IUI } from '../../helpers/interfaces/IUI';
import BaseComponent from '../BaseComponent';

export default class UI extends BaseComponent {
    constructor(config: IUI) {
        super(config)
        this.addSpinButton()
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
}