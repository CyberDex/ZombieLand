import { Actions } from '../redux/actionTypes';

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