import { GET_PRODUCTS } from '../constants/productConstants';
import axios from 'axios';

export const getProducts=  ()=> async dispatch=>{

    try {
        const response = await axios.get('/products' );
        dispatch({type: GET_PRODUCTS, payload: response.data})
    } catch (error) {
        console.log('Get products error', error)
    }
    

    }