const categoryReducer = (state = 'NONE', action) => {
    if(!(action.type.indexOf('JOKE') > -1) && action.type !== '@@INIT') {
        return state = action.type;
    } else {
        return state;
    }
}

export default categoryReducer;