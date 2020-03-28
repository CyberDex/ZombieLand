import { IResult, ISlotMachine } from '../helpers/interfaces/ISlotMachine';
import { store } from '../redux/store';
import { Actions } from '../redux/actionTypes';

export default class ResultController {
    private config: ISlotMachine

    constructor(config: ISlotMachine) {
        this.config = config
        store.subscribe(() => {
            store.getState().result === undefined && this.getResult()
        })
    }

    private getResult() {
        let result: IResult = [[], [], []];
        for (let reel = 0; reel < this.config.reelsCount; reel++) {
            for (let slot = 0; slot < this.config.slotsCount; slot++) {
                result[reel][slot] = Math.floor(Math.random() * (13 - 1) + 1);
            }
        }
        store.dispatch({ type: Actions.RESULT_LOADED, result: result })
    }
}