import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { isAuthenticated } from '../helpers/auth';
import EditProductModal from '../components/Admin/EditProductModal';


 export default function Home(){
     const [selectedProduct,setSelectedProduct]= useState({})

    

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
                            <h4 className="card-title text-primary">{product.name}</h4>
                            <h5>{product.price}<i className="fas fa-euro-sign"/></h5>
                            {isAuthenticated().role===1 ? 
                            (<><button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#editProduct" onClick={()=>setSelectedProduct(product)}><i class="fas fa-edit"/>        Edit</button>  
                            <button className='btn btn-outline-primary'><i class="fas fa-trash-alt"/>       Delete</button></>)
                            :
                            (<button className="btn btn-primary">Add to cart</button>)
                            }
                            
                        </div>                         
                    </div>
                </div>       
            ))}

         {selectedProduct && <EditProductModal product={selectedProduct} />} 
              
            </div>

        </div>


              
    </>
    );



}

