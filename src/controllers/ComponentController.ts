import { Components } from '../helpers/enums/components';
import { IComponentsList, IComponentsConfig } from '../helpers/interfaces/IComponents';
import { ISlotMachine } from '../helpers/interfaces/ISlotMachine';
import { Application, Container } from 'pixi.js';
import { IUI } from '../helpers/interfaces/IUI';
import PreloadController from "./PreloadController";
import Machine from '../components/slot/Machine'
import Background from '../components/bg/BG'
import UI from '../components/ui/UI';
import BaseComponent from '../components/BaseComponent';

export default class ComponentController {
    private application: Application
    private components: IComponentsList = {}
    private preloader: PreloadController

    constructor(application: Application) {
        this.application = application
        this.preloader = new PreloadController(application)
    }

    public async initComponents(components: Components[]) {
        const config = await this.preloader.loadConfigs(components)
        await this.preloader.loadAssets(config as IComponentsConfig)
        for (const component of components) {
            this.components[component] = {
                elements: this.initComponent(component, config[component])
            }
        }
    }

    private initComponent(componentType: Components, config: IComponentsConfig): Container[] {
        let elements: Container[]
        switch (componentType) {
            case Components.BG:
                elements = [
                    new Background(config.bg),
                    new BaseComponent(config.logo)
                ]
                break;
            case Components.SLOT_MACHINE:
                // new SlotsController(this.application, config as IUI)
                elements = [
                    new Machine(config as ISlotMachine)
                ]
                break;
            case Components.UI:
                elements = [
                    new UI(config.ui as IUI)
                ]
                break;
        }
        elements.forEach(element => this.application.stage.addChild(element));
        return elements
    }
}