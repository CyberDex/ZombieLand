import { createStore, applyMiddleware } from 'redux'
import { mainReducer } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
export const store = createStore(
    mainReducer,
    composeWithDevTools(
        applyMiddleware(logger)
    )
)