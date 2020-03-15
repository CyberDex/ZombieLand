import { Components } from '../helpers/enums/components';
import { Assets } from '../helpers/enums/assets';
import { IComponentsList, IComponentsConfig, IComponentConfig, IComponent } from '../helpers/interfaces/IComponents';
import { ISlotMachine } from '../helpers/interfaces/ISlotMachine';
import { Application } from 'pixi.js';
import PreloadController from "./PreloadController";
import Background from '../components/ui/Background'
import Logo from "../components/ui/Logo";
import Machine from '../components/slot/Machine'

export default class ComponentController {
    private application: Application
    private components: IComponent[]
    private preloader: PreloadController

    constructor(application: Application) {
        this.application = application
        this.preloader = new PreloadController(application)
    }

    public async initComponents(components: Components[]) {
        const config = await this.preloader.loadConfigs(components)
        await this.preloader.loadAssets(config as IComponentsConfig)
        for (const component of components) {
            this.initComponent(component, config[component])
        }
    }

    private initComponent(componentType: string, config: IComponentConfig) {
        switch (componentType) {
            case Components.SLOT_MACHINE:
                this.application.stage.addChild(
                    new Machine(config as ISlotMachine)
                )
                break;
            case Components.UI:
                this.application.stage.addChild(
                    new Background(Assets.BG),
                    new Logo(Assets.LOGO)
                )
                break;
        }
    }
}