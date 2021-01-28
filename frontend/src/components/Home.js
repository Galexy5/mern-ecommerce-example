import {useSelector} from 'react-redux';


export default function Home(){

    const {products} = useSelector(state=>state.products) ;
    console.log(products)
    return(
    <>
        <div className='container mt-5'>
            <div className="row">
                {products.map(product=>(
                 <div key={product._id} className="col">
                    <div  className="card mb-4" style={{width: '18rem'}}>
                         <img className="card-img-top" src={`/uploads/${product.productPhoto}`} style={{height:'15rem'}} alt=""/>
                         <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <button className="btn btn-primary">Add to cart</button>
                        </div>                         
                    </div>
                </div>       
            ))}
               
            </div>

        </div>
    </>
    );
}