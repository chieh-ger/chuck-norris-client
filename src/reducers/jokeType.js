const jokeTypeReducer = (state = 'single', action) => {
    switch(action.type) {
        case 'single':
            return 'single';
        case 'multi':
            return 'multi';
        default:
            return 'default';
    }
}

export default jokeTypeReducer;