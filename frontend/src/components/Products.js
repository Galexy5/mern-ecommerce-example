import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

export default function Products(props){

    const {mainCategory,subCategory} = props.location.state

    const {products} = useSelector(state=>state.products) ;

    return (
        <>
        <div className='container mt-5'>
            <div className="row">
                {products.map(product=>(
                    (product.main_category===mainCategory && product.sub_category===subCategory) &&
                 <div key={product._id} className="col">
                    <div  className="card mb-4" style={{width: '18rem'}}>
                         <Link to={{pathname: '/product', state:{product: product}}} ><img className="card-img-top" src={`/uploads/${product.productPhoto}`} style={{height:'15rem'}} alt=""/></Link>
                         <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <h5>{product.price}<i className="fas fa-euro-sign"/></h5>
                            <button className="btn btn-primary">Add to cart</button>
                        </div>                         
                    </div>
                </div>       
            ))}
               
            </div>

        </div>
    </>
    )

}