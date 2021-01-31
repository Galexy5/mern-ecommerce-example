import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { isAuthenticated } from '../helpers/auth';

 export default function Home(){
     const [product,setProduct]= useState({})

    // const showEditModal = (product)=>{
        
     


    // }
    

    const {products} = useSelector(state=>state.products) ;
    return(
    <>
        <div className='container mt-5'>
            <div className="row">
                {products.map(product=>(
                 <div key={product._id} className="col">
                    <div  className="card mb-4" style={{width: '18rem'}}>
                         <Link to={{pathname: '/product', state:{product: product}}} ><img className="card-img-top" src={`/uploads/${product.productPhoto}`} style={{height:'15rem'}} alt=""/></Link>
                         <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            {isAuthenticated().role===1 ? 
                            (<><button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#editProduct" onClick={()=>setProduct(product)}><i class="fas fa-edit"/>        Edit</button>  
                            <button className='btn btn-outline-primary'><i class="fas fa-trash-alt"/>       Delete</button></>)
                            :
                            (<button className="btn btn-primary">Add to cart</button>)
                            }
                            
                        </div>                         
                    </div>
                </div>       
            ))}

          
               
            </div>

        </div>


        <div id="editProduct" className="modal">
            <div className='modal-dialog modal-dialog-centered modal-lg'>
                <div className="modal-content">
                    <div className="modal-header"><h5 className="modal-title">Edit Product</h5></div>
                    <div className="modal-body">{product.name}</div>
                    <div className="modal-footer">footer</div>
                </div>
            </div>
        </div>           
    </>
    );



}

