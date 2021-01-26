import {GET_WOMEN_CATEGORIES} from '../constants/categoryConstants';

const INITIAL_STATE = {
    womenCategories:[]
}

export const womenCategoriesReducer = (state=INITIAL_STATE,action) =>{
    switch (action.type) {
        case GET_WOMEN_CATEGORIES:
            return{
                ...state,
                womenCategories: action.payload
            }
            
    
        default:
            return state
    }
}

