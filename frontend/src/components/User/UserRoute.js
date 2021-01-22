import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/auth';


export default function UserRoute({ component: Componnent, ...rest }){
    return(
        <Route 
            {...rest}
            render={(props)=>
                isAuthenticated() && isAuthenticated().role === 0 
                ? <Componnent {...props}/>
                : isAuthenticated() && isAuthenticated().role === 1 
                ? <Redirect to='/'/>
                : <Redirect to='/login'/>
                
            }
        />
    )
}