import { Sprite, ISize } from "pixi.js"

function pos(ancor: number, size: number, elSize: number): number {
    return ancor === 0
        ? size - elSize
        : size * ancor
}

export function fit(element: Sprite, size: ISize, config: any) {
    if (!config) { return }

    const positionX = pos(element.anchor.x, size.width, element.width)
    const positionY = pos(element.anchor.y, size.height, element.height)

    if (window.innerWidth > window.innerHeight) { // labdscape
        element.height = size.height * config.lanscape.maxHeight / 100
        element.width = element.texture.width * size.height / element.texture.height * config.lanscape.maxHeight / 100

        element.position.x = positionX * config.lanscape.posX / 100
        element.position.y = positionY * config.lanscape.posY / 100
    } else { // portrait
        element.width = size.width * config.portrait.maxWidth / 100
        element.height = element.texture.height * size.width / element.texture.width * config.portrait.maxWidth / 100

        element.position.x = positionX * config.portrait.posX / 100
        element.position.y = positionY * config.portrait.posY / 100
    }
}


export function fill(element: Sprite, size: ISize) {
    element.position.x = pos(element.anchor.x, size.width, element.width)
    element.position.y = pos(element.anchor.y, size.height, element.height)

    element.height = size.height
    element.width = element.texture.width * size.height / element.texture.height

    if (element.width < size.width) {
        element.width = size.width
        element.height = element.texture.height * size.width / element.texture.width
    }
}