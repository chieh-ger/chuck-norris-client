import { createStore } from 'redux';
import jokeTypeReducer from './reducers/jokeType';

const store = createStore(
    jokeTypeReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;