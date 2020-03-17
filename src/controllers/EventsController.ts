import * as EventEmitter from 'eventemitter3'

export default class EventsController extends EventEmitter {
    private static _instance: EventsController
    private constructor() {
        super()
    }

    static get instance() {
        if (!EventsController._instance) {
            EventsController._instance = new EventsController()
        }
        return EventsController._instance
    }
}