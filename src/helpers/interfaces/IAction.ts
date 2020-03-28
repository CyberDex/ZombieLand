import { Actions } from '../../redux/actionTypes';

export default interface IAction {
    [val: string]: {},
    type: Actions
}