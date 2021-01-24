import axios from 'axios';

export const addCategory= async (data)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post('/admin/dashboard', data , config);

    return response;

    }
