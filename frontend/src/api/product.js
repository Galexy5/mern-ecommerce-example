import axios from 'axios';

export const createProduct= async (data)=>{

    const response = await axios.post('/admin/dashboard/newproduct', data );

    return response;

    }

    export const editProduct= async (data)=>{

        const response = await axios.post('/admin/dashboard/editproduct', data );
    
        return response;
    
        }