import {useState , useEffect} from 'react';
import {editProduct} from '../../api/product';
import {useSelector} from 'react-redux';



export default function EditProductModal({product}){

   

    const {womenCategories} = useSelector(state=>state.womenCategories) ;
    const {menCategories } = useSelector(state=>state.menCategories) ;

  

    const [sizeInputs,setSizeInputs] = useState([])


    const [formData,setFormData]=useState({})

    

   useEffect(()=>{
       setFormData({
        mainCategory: product.main_category,
        subCategory: product.sub_category,
        productName: product.name,
        description: product.description,
        price: product.price,
        productPhoto: product.productPhoto
       })     
      
       setSizeInputs(product.sizes)
   },[product])




    const {mainCategory,subCategory,productName,description,price,productPhoto} = formData; 

    const sizes= sizeInputs;



    /*****MESSAGES*****/ 
    const [submitMessage,setSubmitMessage]= useState('')
    const [emptyFieldsError,setEmptyFieldsError]=useState('');

       /******EVENTS ********/


const submitEditProduct = (event)=>{

    event.preventDefault();

    const emptySizes=sizes.some(sizeField=>{ //Check if a size field is empty
        if(sizeField.size===0 || sizeField.quantity===0){
            return true
        }
    })
    if(productPhoto===null){
        setEmptyFieldsError('Please select a photo')
    }else if(subCategory==='' || productName==='' || description==='' || price===0 || emptySizes ){
    
        setEmptyFieldsError('All fields are required')
        
    }else{
        let productData = new FormData();

        productData.append('_id', product._id);
        productData.append('mainCategory', mainCategory);
        productData.append('subCategory',  subCategory);
        productData.append('productName', productName);
        productData.append('description', description);
        productData.append('price', price);
        productData.append('productPhoto', productPhoto);
        productData.append('sizes', JSON.stringify(sizeInputs));


        editProduct(productData).then(response=>{


            setSubmitMessage(response.data.resp)
            
        }).catch(error=>console.log(error))



       
    }

}

const fieldsChange = (event) =>{
    setSubmitMessage('');
    setEmptyFieldsError('');
    if(event.target.name!=='productPhoto'){

      

        if(event.target.name==='mainCategory'){
             event.target.value==='Women' ?  setFormData({...formData, mainCategory:'Women', subCategory: womenCategories[0].sub_category}) : setFormData({...formData, mainCategory:'Men',subCategory: menCategories[0].sub_category})
        }else{
            setFormData({...formData, [event.target.name]:event.target.value})
        }
        
        
        
        
    }     


}

 const productPhotoChange = (event) =>{
    setFormData({...formData, [event.target.name]:event.target.files[0]})
}

const sizeChange =(index,event)=>{

   setSubmitMessage('');
   setEmptyFieldsError('');
   const values=[...sizeInputs];
   values[index][event.target.name]=event.target.value==='' ? event.target.value : parseInt(event.target.value);
   setSizeInputs(values)

}

const addSize = ()=>{
   setSubmitMessage('');
   setEmptyFieldsError('');
   setSizeInputs([...sizeInputs, {size:0,quantity:1}])

}

const removeSize = (index)=>{
   setSubmitMessage('');
   setEmptyFieldsError('');
   const values= [...sizeInputs]
   values.splice(index,1)

   setSizeInputs(values)  
}



    return (
        <div id="editProduct" className="modal">
            <div className='modal-dialog modal-dialog-centered modal-lg'>
                <div className="modal-content">
                 <form onSubmit={submitEditProduct}>
                    <div className="modal-header bg-info"><h3 className="modal-title">Edit Product</h3></div>
                    <div className="modal-body">

                        <div className="text-primary"><h5>Change photo</h5></div>
                            <div className="custom-file">
                                <input type="file" name="productPhoto"  onChange={productPhotoChange} class="custom-file-input" id="productPhoto"/>
                            </div>


                        <div className="text-primary"><h5>Main Category</h5></div>
                            <select name="mainCategory" value={mainCategory} onChange={fieldsChange} className="form-select form-select-lg mb-3" aria-label="mainCategory">

                            {mainCategory && mainCategory==='Women' ? 
                            <>
                            <option selected value='Women'>Women</option>
                            <option value="Men">Men</option> 
                            </>
                            :
                            <>
                            <option selected value='Men'>Men</option>
                            <option value="Women">Women</option>      
                            </>
                                                
                        }


                            </select>

                        <div className="text-primary"><h5>Sub Category</h5></div>
                        
                            <select name="subCategory" value={subCategory} onChange={fieldsChange} className="form-select form-select-lg mb-3" aria-label="subCategory">
                                <option selected value={subCategory}>{subCategory}</option>
                            
                                    {mainCategory==='Women' && mainCategory ? womenCategories && womenCategories.map(womanCat=>(

                                        
                                            womanCat.sub_category!==subCategory &&
                                            <option key={womanCat._id} value={womanCat.category}>{womanCat.sub_category}</option>
                                     
                                        
                                    )) :
                                    menCategories && menCategories.map(manCat=>(
                                        manCat.sub_category !==subCategory &&
                                        <option key={manCat._id} value={manCat.category}>{manCat.sub_category}</option>
                                    ))
                                    }

                            </select>
                        
                            

                        <div className="text-primary"><h5>Name</h5></div>
                            <div className="input-group input-group-lg" >
                            <input type="text" value={productName} name="productName" onChange={fieldsChange} className="form-control" aria-label="productName" aria-describedby="inputGroup-sizing-lg"/>
                            </div>

                        <div className="text-primary"><h5>Description</h5></div>  
                            <div className="input-group input-group-lg">
                                <textarea class="form-control" value={description} onChange={fieldsChange} id="description"  name="description" rows="3"></textarea>
                            </div>

                        <div className="text-primary"><h5>Price</h5></div>        
                            <div className="">
                             <input type="number" min='1' name="price" value={price} onChange={fieldsChange}  className="" style={{width:50}} aria-label="price" aria-describedby="inputGroup-sizing-lg"/><i className="fas fa-euro-sign"/>
                            </div>

                        <div className="text-primary"><h5>Sizes</h5></div> 

                        {sizes && sizes.map((sizeField,index)=>(
                           
                            <div key={index}>
                        
                                <label><h3>Size</h3></label>
                                <input type="text"  name="size" value={sizeField.size} onChange={event=>sizeChange(index,event)} style={{width:50}} aria-label="size" aria-describedby="inputGroup-sizing-lg"/>
                                

                                <label><h3>Quantity</h3></label>
                                <input type="number"  min='0' max='50' name="quantity" value={sizeField.quantity} onChange={event=>sizeChange(index,event)} style={{width:70}} aria-label="quantity" aria-describedby="inputGroup-sizing-lg"/>
                        
                                {sizes.length>1 && 
                                (<button type="button" onClick={()=>removeSize(index)} className="btn btn-primary "><i className="fas fa-minus"/></button>) 
                
                            }
                                <button type="button" onClick={addSize} className="btn btn-primary"><i className="fas fa-plus"/></button>
                            </div>
                ))}
                    
                </div>
                    <div className="modal-footer">
                    <div className={emptyFieldsError==='' ? '' : "alert alert-danger"} role="alert">
                  {emptyFieldsError}
              </div>
                  
              <div className={submitMessage==='' ? '' : submitMessage==='This product already exists' ? "alert alert-danger" : "alert alert-success"} role="alert">
                  {submitMessage}
              </div>
                    <button className="btn btn-secondary btn-lg " data-bs-dismiss='modal'>Close</button> <button type="submit" className="btn btn-primary btn-lg ">Submit changes</button>
                        </div>
                 </form>   
                </div>
            </div>
        </div>     
    )

}