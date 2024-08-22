import { ADD_CATEGORY, REMOVE_CATEGORY, UPDATE_CATEGORY } from "./categoryTypes";

export const addCategory = (category) => {
    return {
        type: ADD_CATEGORY,
        payload: category,
    }
}

export const removeCategory = (id) => {
    return {
        type: REMOVE_CATEGORY,
        payload: id,
    }
}

export const updateCategory = (category) => {
    return {
        type: UPDATE_CATEGORY,
        payload: category,
    }
}