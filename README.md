# Zombie Land Slot

[Play game](https://cyberdex.github.io/games/ZombieLand/ "Play game")

## Project description
- GSAP3
- Pixi 5
- TypeScript
- Webpack

MVP pattern is using as base of architecture, which is standard for game development in javascript, also, there are examples of singleton, factory and some other patterns.

Redux is using as the event system.

Application is adaptive, so you can run it on any mobile device the same as a desktop (it is resizable).

It is basing on component system, that allows you to remove any component, like BG or UI or even slot itself and all other functionality will keep working (look at SlotGame.ts file).

## Run game localy
Install dependencies

```
npm install
```

Run on https://localhost:8080

```
npm start
```

Development build:
```
npm run build
```
