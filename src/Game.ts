import { Application } from "pixi.js"
import * as PIXI from "pixi.js"
import Background from './components/ui/Background'
import Logo from "./components/ui/Logo";
import Reels from './components/Reels'
import IConfig from "./interfaces/IConfig";
import { Assets } from './enums/Assets';

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
            this.config?.ui?.assets.forEach(asset => this.loader.add(asset));
            this.config?.reels?.assets.forEach(asset => this.loader.add(asset));
            this.loader.load(resolve)
        })
    }

    private renderElements() {
        this.stage.addChild(
            new Background(Assets.BG),
            new Logo(Assets.LOGO),
            new Reels(this.config.reels)
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