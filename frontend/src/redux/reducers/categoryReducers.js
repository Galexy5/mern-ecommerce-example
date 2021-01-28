import {GET_WOMEN_CATEGORIES, GET_MEN_CATEGORIES} from '../constants/categoryConstants';

const INITIAL_STATE = {
    womenCategories:[],
    menCategories: []
}

export const womenCategoriesReducer = (state=INITIAL_STATE.womenCategories,action) =>{
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

export const menCategoriesReducer = (state=INITIAL_STATE.menCategories,action) =>{
    switch (action.type) {
        case GET_MEN_CATEGORIES:
            return{
                ...state,
                menCategories: action.payload
            }
            
    
        default:
            return state
    }
}

