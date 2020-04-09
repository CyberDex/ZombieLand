import { Actions } from './actionTypes'
import IAction from '../helpers/interfaces/IAction'

const initialState = {
    spin: false
}

export function mainReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case Actions.SPIN_START:
            return {
                ...state,
                spin: true
            }
        case Actions.SPIN_STOP:
            return {
                ...state,
                spin: false
            }
        default:
            return state
    }
}