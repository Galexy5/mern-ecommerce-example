import { useState } from 'react';
import Category from './Category';
import AddProducts from './AddProducts';
import ViewOrders from './ViewOrders';

export default function AdminDashboard(){

    const [ option, setOption ] = useState(ViewOrders);


    const handleButtons = (event) =>{
        if(event.target.id==='products'){
            setOption(AddProducts)
        }else if(event.target.id==='categories'){
            setOption(Category)
        }else{
            setOption(ViewOrders)
        }
    }


    return(
        
        <div className="container-fluid">
            <div className="row">
            <div className="col-2 px-1 bg-light position-fixed" id="sticky-sidebar">
                <div className="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2 mt-4">
                    
                        <button id='orders'onClick={handleButtons} className="btn btn-primary btn-lg w-100 my-2">My Orders</button>
                        
                        <button id='products' onClick={handleButtons} className="btn btn-primary btn-lg w-100 my-2">Products</button>
                       
                   <button id='categories' onClick={handleButtons} className="btn btn-primary btn-lg w-100 my-2">Categories</button>
                </div>
            </div>
                <div className="col offset-2" id="main">
                    {option}
                    
                </div>
            </div>
        </div>

    )
}