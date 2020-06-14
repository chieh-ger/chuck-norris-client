import { combineReducers } from 'redux';
import categoryReducer from './category';
import jokeType from './jokeType';

const allReducers = combineReducers({
    type: jokeType,
    category: categoryReducer
})

export default allReducers;