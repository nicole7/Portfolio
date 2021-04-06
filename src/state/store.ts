import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

//manually test store
    // store.dispatch({
    //     type: ActionType.INSERT_CELL_BEFORE,
    //     payload: {
    //         id: null,
    //         type: 'code'
    //     },
    // });

    // store.dispatch({
    //     type: ActionType.INSERT_CELL_BEFORE,
    //     payload: {
    //         id: null,
    //         type: 'text'
    //     },
    // });
