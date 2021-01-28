
export default function Product (props){

 const {product} = props.location.state

 const sizes= product.sizes.map(s=> {return s.size})

    return(
        <>
   
            <div className="row">
                <div className="col-md-6">
                    <img src={`/uploads/${product.productPhoto}`} className="img-fluid" alt="product"/>
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <br/>
                    <h3>Price</h3>
                    <h4>{product.price}<i className="fas fa-euro-sign"/></h4>
                    <br/>
                    <div className='form-group'>
											
											<select
												className='form-select form-select mb-3 w-50'
												name='productCategory'
												// onChange={handleProductChange}
											>
												<option value=''>
													Choose size...
												</option>
                                                { 
                                                sizes.sort().map(size=>(
                                                <option value={size}>{size}</option>
                                                ))
                                                }
												
											</select>
										</div>

                    <h3>Description</h3>
                    <p>{product.description}</p>
                </div>
            </div>
   

        </>
    )
}