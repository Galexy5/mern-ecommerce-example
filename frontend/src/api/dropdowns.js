import axios from 'axios';

export const womenCategories= async ()=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const response = await axios.get('/categories/women' , config);

    return response;

    }

    export const menCategories= async ()=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const response = await axios.get('/categories/men', config);
    
        return response;
    
        }