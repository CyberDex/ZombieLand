import { Actions } from '../redux/actionTypes';
import { IResult } from '../helpers/interfaces/ISlotMachine';
import { IAction } from '../helpers/interfaces/IAppState';

export function startSpin(): IAction {
    return {
        type: Actions.SPIN_START,
        result: undefined
    }
}

export function stopSpin(): IAction {
    return {
        type: Actions.SPIN_STOP
    }
}

export function resultLoaded(result: IResult): IAction {
    return {
        type: Actions.RESULT_LOADED,
        result: result
    }
}