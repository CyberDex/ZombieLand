import { IResult, ISlotMachine } from '../helpers/interfaces/ISlotMachine';
import { store } from '../redux/store';
import { Actions } from '../redux/actionTypes';
import { resultLoaded } from '../redux/actions';

export default class ResultController {
    private config: ISlotMachine

    constructor(config: ISlotMachine) {
        this.config = config
        store.subscribe(() => {
            const state = store.getState()
            state.spin && state.result === undefined && this.getResult()
        })
    }

    private getResult() {
        let result: IResult = []
        for (let reel = 0; reel < this.config.reelsCount; reel++) {
            const reel = []
            for (let slot = 0; slot < this.config.slotsCount; slot++) {
                const slot = Math.floor(Math.random() * (13 - 1) + 1)
                reel.push(slot)
            }
            result.push(reel)
        }
        setTimeout(() =>
            store.dispatch(resultLoaded(result))
            , 5000)
    }
}