import { Application } from '@pixi/app'
import { Renderer } from '@pixi/core'
import { BatchRenderer } from '@pixi/core'
Renderer.registerPlugin('batch', BatchRenderer)
import { TilingSpriteRenderer } from '@pixi/sprite-tiling'
Renderer.registerPlugin('tilingSprite', TilingSpriteRenderer)
import { TickerPlugin } from '@pixi/ticker'
Application.registerPlugin(TickerPlugin)
import { AppLoaderPlugin } from '@pixi/loaders'
Application.registerPlugin(AppLoaderPlugin)

import App from './App'
window.onload = new App({
    roundPixels: false
})