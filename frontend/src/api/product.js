import axios from 'axios';

export const createProduct= async (data)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post('/admin/dashboard/newproduct', data , config);

    return response;

    }