const jokeTypeReducer = (state = 'singular', action) => {
    switch(action.type) {
        case 'singular':
            return 'singular';
        case 'multi':
            return 'multi';
        default:
            return 'singular';
    }
}

export default jokeTypeReducer;