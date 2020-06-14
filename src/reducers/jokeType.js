const jokeTypeReducer = (state = 'SINGULAR_JOKE', action) => {
    switch(action.type) {
        case 'SINGULAR_JOKE':
            return 'single'
        case 'MULTI_JOKE':
            return 'multi';
        default:
            return state;
    }
}

export default jokeTypeReducer;