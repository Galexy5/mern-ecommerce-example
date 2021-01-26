import axios from 'axios';

export const createNewCategory= async (data)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post('/admin/dashboard/newcategory', data , config);

    return response;

    }

    export const getWomenCategories= async ()=>{

    const response = await axios.get('/categories/women' );

    return response;

    }

    export const getMenCategories= async ()=>{

        const response = await axios.get('/categories/men');
    
        return response;
    
        }
