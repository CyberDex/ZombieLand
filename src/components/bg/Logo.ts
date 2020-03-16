import { IComponentConfig } from "../../helpers/interfaces/IComponents"
import BaseComponent from '../BaseComponent';

export default class Logo extends BaseComponent {
    constructor(config: IComponentConfig) {
        super(config)
        this.anchor.set(.5)
    }
}