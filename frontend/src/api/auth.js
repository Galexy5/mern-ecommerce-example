import axios from 'axios';

export const register= async (data)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post('/user/register', data , config);

    return response;

    }


    export const login= async (data)=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const response = await axios.post('/user/login', data , config);
    
        return response;
    
        }