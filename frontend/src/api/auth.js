import axios from 'axios';

export const register= async (data)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post('/register', data , config);

    return response;

    }
