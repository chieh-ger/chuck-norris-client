export const singular = () => {
    return {
        type: 'SINGULAR_JOKE'
    }
}

export const multi = () => {
    return {
        type: 'MULTI_JOKE'
    }
}

export const setCategory = (category) => {
    return {
        type: category
    }
}