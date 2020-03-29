import { Actions } from './actionTypes'
import { IAppState, IAction } from '../helpers/interfaces/IAppState'

const initialState: IAppState = {
    spin: false,
    result: undefined
}

export function mainReducer(state: IAppState = initialState, action: IAction) {
    switch (action.type) {
        case Actions.SPIN_START:
            return {
                ...state,
                spin: true,
                result: undefined
            }
        case Actions.SPIN_STOP:
            return {
                ...state,
                spin: false
            }
        case Actions.RESULT_LOADED:
            return {
                ...state,
                result: action.result
            }
        default:
            return state
    }
}