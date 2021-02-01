import EditProductModal from '../components/Admin/EditProductModal';
import {useSelector} from 'react-redux';
import {useState,useEffect} from 'react'
import { isAuthenticated } from '../helpers/auth';

export default function Product (props){

    const [currentProduct,setCurrentProduct]= useState({});
    const {products} = useSelector(state=>state.products) ;


 useEffect(()=>{
     setCurrentProduct(products.find(p=> p._id===props.location.state.product._id))     
 },[products])




    return(
        <>
            {currentProduct &&(
                <div className="row">
                <div className="col-md-6">
                    <img src={`/uploads/${currentProduct.productPhoto}`} className="img-fluid" alt="product"/>
                </div>
                <div className="col-md-6">
                    <h2>{currentProduct.name}</h2>
                    <br/>
                    <h3>Price</h3>
                    <h4>{currentProduct.price}<i className="fas fa-euro-sign"/></h4>
                    <br/>
                    <div className='form-group'>
											
											<select
												className='form-select form-select mb-3 w-50'
												name='productCategory'
											>
												<option value=''>
													Choose size...
												</option>
                                                { 
                                                currentProduct.sizes && currentProduct.sizes.map(s=> {return s.size}).sort().map(size=>(
                                                <option value={size}>{size}</option>
                                                ))
                                                }
												
											</select>
										</div>

                    <h3>Description</h3>
                    <p>{currentProduct.description}</p>
                    {isAuthenticated().role===1 ? 
                            (<><button className='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#editProduct"><i class="fas fa-edit"/>        Edit</button>  
                            <button className='btn btn-outline-primary'><i class="fas fa-trash-alt"/>       Delete</button></>)
                            :
                            (<button className="btn btn-primary">Add to cart</button>)
                            }
                </div>
            </div>

            )}
            
   
            {currentProduct && <EditProductModal product={currentProduct}/> }               
        </>
    )
}