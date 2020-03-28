import { Actions } from '../redux/actionTypes';
import { IResult } from '../helpers/interfaces/ISlotMachine';

export function startSpin() {
    return {
        type: Actions.SPIN_START
    }
}

export function stopSpin() {
    return {
        type: Actions.SPIN_STOP
    }
}

export function loadResult() {
    return {
        type: Actions.LOAD_RESULT
    }
}

export function resultLoaded(result: IResult) {
    return {
        type: Actions.LOAD_RESULT,
        result: result
    }
}