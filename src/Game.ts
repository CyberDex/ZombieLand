import { Application } from "pixi.js"
import Background from './components/Background'
import Reels from './components/Reels'

class Game extends Application {
    private background: Background;
    private reels: Reels;

    constructor() {
        super()
        document.body.appendChild(this.view)
        window.addEventListener('resize', this.onResize.bind(this))
        this.init()
    }

    init() {
        this.loader.add('bg', './assets/bg.png')
        this.loader.add('reels', './assets/reels.png')
        this.loader.add('slots', './assets/slots-0.json')
        this.loader.load(() => this.draw())
    }

    draw() {
        this.stage.addChild(
            this.background = new Background('bg'),
            this.reels = new Reels('reels')
        )
        this.onResize()
        this.ticker.add(this.onUpdate.bind(this))
    }

    onUpdate(delta: number) {
        // this.ground.onUpdate(delta)
        // this.clouds.onUpdate(delta)
    }

    onResize() {
        this.renderer.resize(window.innerWidth + 2, window.innerHeight + 2)
        const width = this.renderer.width
        const height = this.renderer.height
        this.background.resize(width, height)
        this.reels.resize(width, height)
    }
}
document.body.appendChild(new Game().view);