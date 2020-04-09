import { Components } from '../helpers/enums/components'
import { IComponentsConfig, IComponentConfig } from '../helpers/interfaces/IComponents'
import { ISlotMachine } from '../helpers/interfaces/ISlotMachine'
import { Application, Container } from 'pixi.js'
import { IUI } from '../helpers/interfaces/IUI'
import PreloadController from './PreloadController'
import Machine from '../components/slot/Machine'
import Background from '../components/bg/BG'
import Logo from '../components/bg/Logo'
import UI from '../components/ui/UI'

export default class ComponentController {
    private application: Application
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

    private initComponent(componentType: Components, config: IComponentConfig) {
        switch (componentType) {
            case Components.BG:
                this.application.stage.addChild(
                    new Background(config.bg),
                    new Logo(config.logo)
                )
                break
            case Components.SLOT_MACHINE:
                this.application.stage.addChild(
                    new Machine(config as ISlotMachine)
                )
                break
            case Components.UI:
                this.application.stage.addChild(
                    new UI(config as IUI, this.application),
                )
                break
        }
    }
}