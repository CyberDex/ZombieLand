import { Application } from "pixi.js"
import * as PIXI from "pixi.js"
import Background from './components/Background'
import Reels from './components/Reels'
import Logo from "./components/Logo";
import IConfig from "./interfaces/IConfig";

class Game extends Application {
    private config: IConfig;

    constructor() {
        super()
        window.addEventListener('resize', this.onResize.bind(this))
    }

    public async init() {
        await this.loadConfig()
        await this.loadAssets()
        this.renderElements()
    }

    private loadConfig() {
        return fetch("assets/config/main.json")
            .then(response => response.json())
            .then(json => this.config = json)
    }

    private loadAssets(): Promise<any> {
        return new Promise(resolve => {
            for (const asset in this.config?.preload) {
                this.loader.add(asset, this.config.preload[asset])
            }
            const reelsPreload = this.config?.reels?.preload;
            for (let i = 0; i < reelsPreload?.filesCount; i++) {
                this.loader.add(reelsPreload.urlTemplate.replace("{fileID}", String(i)))
            }
            this.loader.load(resolve)
        })
    }

    private renderElements() {
        this.stage.addChild(
            new Background('bg'),
            new Reels(this.config.reels),
            new Logo('logo'),
        )
        this.onResize()
    }

    private onResize() {
        this.renderer.resize(window.innerWidth + 2, window.innerHeight + 2)
        this.stage.children.forEach((element: any) => element.resize(this.renderer.width, this.renderer.height));
    }
}

const game = new Game()
game.init()
    .then(() => document.body.appendChild(game.view))
window.PIXI = PIXI;