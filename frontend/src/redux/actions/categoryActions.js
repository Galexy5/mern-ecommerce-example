import {GET_WOMEN_CATEGORIES} from '../constants/categoryConstants';
import axios from 'axios';

export const getWomenCategories=  ()=> async dispatch=>{

    try {
        const response = await axios.get('/categories/women' );
        dispatch({type: GET_WOMEN_CATEGORIES, payload: response.data})
    } catch (error) {
        console.log('Get women categories error', error)
    }
    

    }