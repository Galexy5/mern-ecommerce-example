import { GET_PRODUCTS } from '../constants/productConstants';

const INITIAL_STATE = {
    products:[]
}

export const getProductsReducer = (state=INITIAL_STATE,action) =>{
    switch (action.type) {
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload
            }
            
    
        default:
            return state
    }
}