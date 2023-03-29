import { IComponentsConfig } from '../helpers/interfaces/IComponents'
import { Application } from 'pixi.js'
import { Components } from '../helpers/enums/components'

export default class PreloadController {
    private application: Application
    private assetsFolder = 'img/'
    private configsFolder = 'config/'

    constructor(application: Application) {
        this.application = application
    }

    public async loadConfigs(componentsList: Components[]) {
        let loadedConfigs: IComponentsConfig = {}
        for (const component of componentsList) {
            await this.loadConfig(this.configsFolder + component + '.json')
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

    public async loadAssets(configs: IComponentsConfig): Promise<void> {
        return new Promise(async resolve => {
            for (const config in configs) {
                await this.loadConfig(this.assetsFolder + config + '/0.json')
                    .then((assets: any) => {
                        this.application.loader.add(this.assetsFolder + config + '/0.json')
                        assets.meta.related_multi_packs?.forEach((additionalAsset: any) => {
                            this.application.loader.add(this.assetsFolder + config + '/' + additionalAsset)
                        })
                    })
                    .catch(error => console.error(error))
            }
            this.application.loader.load(() => resolve())
        })
    }
}