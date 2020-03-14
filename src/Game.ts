import { Application } from "pixi.js"
import * as PIXI from "pixi.js"
import Background from './components/Background'
import Reels from './components/Reels'

class Game extends Application {
    private background: Background;
    private reels: Reels;

    constructor() {
        super()
        window.addEventListener('resize', this.onResize.bind(this))

        this.loader
            .add('bg', './assets/bg.png')
            .add('reels', './assets/reels.png')
            .add('slots', './assets/slots-0.json')
            .load(() => this.draw())
    }

    private draw() {
        this.stage.addChild(
            this.background = new Background('bg'),
            this.reels = new Reels('reels')
        )
        this.onResize()
        this.ticker.add(this.onUpdate.bind(this))
    }

    private onUpdate(delta: number) {
        // this.ground.onUpdate(delta)
        // this.clouds.onUpdate(delta)
    }

    private onResize() {
        this.renderer.resize(window.innerWidth + 2, window.innerHeight + 2)
        const width = this.renderer.width
        const height = this.renderer.height
        this.background.resize(width, height)
        this.reels.resize(width, height)
    }
}
document.body.appendChild(new Game().view);
window.PIXI = PIXI;