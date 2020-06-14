export const singular = () => {
    return {
        type: 'singular'
    }
}

export const multi = () => {
    return {
        type: 'multi'
    }
}

export const setType = (type) => {
    return {
        type
    }
}