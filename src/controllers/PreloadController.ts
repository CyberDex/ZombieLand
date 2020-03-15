import { IComponentsConfig } from "../helpers/interfaces/IComponents";
import { Application } from 'pixi.js';
import { Components } from '../helpers/enums/components';

export default class PreloadController {
    private application: Application
    private assetsFolder = "assets/config/"

    constructor(application: Application) {
        this.application = application
    }

    public async loadConfigs(componentsList: Components[]) {
        let loadedConfigs: IComponentsConfig = {}
        for (const component of componentsList) {
            await this.loadConfig(this.assetsFolder + component + ".json")
                .then(json => loadedConfigs[component] = json)
        }
        return loadedConfigs
    }

    public loadConfig(config: string): Promise<JSON> {
        return new Promise((resolve, reject) => {
            fetch(config)
                .then(response => response.json())
                .then(json => resolve(json))
                .catch(error => reject(error))
        })
    }

    public loadAssets(configs: IComponentsConfig): Promise<any> {
        return new Promise(resolve => {
            for (const config in configs) {
                if (configs[config].assets) {
                    this.application.loader.add(
                        configs[config].assets
                    )
                }
            }
            this.application.loader.load(resolve)
        })
    }
}