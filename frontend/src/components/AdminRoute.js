import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';


export default function AdminRoute({ component: Componnent, ...rest }){
    return(
        <Route 
            {...rest}
            render={(props)=>
                isAuthenticated() && isAuthenticated().role === 1
                ? <Componnent {...props}/>
                : isAuthenticated() && isAuthenticated().role === 0 
                ? <Redirect to='/'/>
                : <Redirect to='/login'/>
            }
        />
    )
}