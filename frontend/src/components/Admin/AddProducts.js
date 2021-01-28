import {useState} from 'react' ;
import {createProduct} from '../../api/product';
import isEmpty from 'validator/lib/isEmpty';

/****REDUX****/
import {useSelector} from 'react-redux';


export default function AddProducts(){

    /**REDUX GLOBAL STATE PROPERTIES***/
    const {womenCategories} = useSelector(state=>state.womenCategories) ;
    const {menCategories } = useSelector(state=>state.menCategories) ;

    
    const [sizeInputs,setSizeInputs] = useState([
        {size:0,quantity:1}
    ])

    const [formData,setFormData]=useState({
        mainCategory:'Women',
        subCategory:'',
        productName:'',
        description:'',
        price:'',
        productPhoto: null
    })

    const {mainCategory,subCategory,productName,description,price,productPhoto} = formData; 
    const sizes= sizeInputs;



    /*****MESSAGES*****/ 
    const [submitMessage,setSubmitMessage]= useState('')
    const [emptyFieldsError,setEmptyFieldsError]=useState('');


    


   /******EVENTS ********/

    const addProduct = (event) =>{
        event.preventDefault();
        const emptySizes=sizes.some(sizeField=>{
            if(sizeField.size===0 || sizeField.quantity===0){
                return true
            }
        })
        if(productPhoto===null){
            setEmptyFieldsError('Please select a photo')
        }else if(isEmpty(subCategory) || isEmpty(productName) || isEmpty(description) || isEmpty(price) || emptySizes ){
        
            setEmptyFieldsError('All fields are required')
            
        }else{
            let productData = new FormData();

            productData.append('mainCategory', mainCategory);
            productData.append('subCategory',  subCategory);
            productData.append('productName', productName);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('productPhoto', productPhoto);
            productData.append('sizes', JSON.stringify(sizeInputs));

            createProduct(productData).then(response=>{
                setFormData(
                    {
                        mainCategory:mainCategory,
                        subCategory: subCategory,
                        productName:'',
                        description:'',
                        price:'',
                        productPhoto: null
                    }
                )
        
                setSizeInputs([{size:0,quantity:1}])

                setSubmitMessage(response.data.resp)
                
            }).catch(error=>console.log(error))
        }
        
            
            

       
    }

  

    const fieldsChange = (event) =>{
            setSubmitMessage('');
            setEmptyFieldsError('');
            if(event.target.name!=='productPhoto'){
                setFormData({...formData, [event.target.name]:event.target.value})
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
console.log(values)
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
        <>
        <form className="w-25" onSubmit={addProduct}>

            <label class="custom-file-label" for="customFile"><h1>Upload Photo</h1></label>
            <div className="custom-file">
                <input type="file" name="productPhoto" onChange={productPhotoChange} class="custom-file-input" id="productPhoto"/>
            </div>
            <br/>
            
            <label><h1>Main Category</h1></label>
            <select name="mainCategory" value={mainCategory} onChange={fieldsChange} className="form-select form-select-lg mb-3" aria-label="mainCategory">

                <option selected value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Accessories">Accessories</option>
            </select>
            <br/>

            <label><h1>Sub Category</h1></label>
            <select name="subCategory" value={subCategory} onChange={fieldsChange} className="form-select form-select-lg mb-3" aria-label="subCategory">
            <option selected value="choose">Choose sub category</option>
            
                {mainCategory==='Women' ? womenCategories && womenCategories.map(womanCat=>(
                    <option key={womanCat.id} value={womanCat.category}>{womanCat.sub_category}</option>
                )) :
                menCategories && menCategories.map(manCat=>(
                    <option key={manCat.id} value={manCat.category}>{manCat.sub_category}</option>
                ))
                }

            </select>
            <br/>

            <label><h1>Product Name</h1></label>
            <div className="input-group input-group-lg">
                <input type="text" value={productName} name="productName" onChange={fieldsChange} className="form-control" aria-label="productName" aria-describedby="inputGroup-sizing-lg"/>
            </div>
            <br/>

            <label><h1>Description</h1></label>
            <div className="input-group input-group-lg">
                <textarea class="form-control" value={description} onChange={fieldsChange} id="description"  name="description" rows="3"></textarea>
            </div>
            <br/>

            <label><h1>Price</h1></label>
            <div className="">
                <input type="number" min='1' name="price" value={price} onChange={fieldsChange}  className="" style={{width:50}} aria-label="price" aria-describedby="inputGroup-sizing-lg"/><i className="fas fa-euro-sign"/>
            </div>

            <br/>

            <label><h1>Sizes</h1></label>
            
                
                {sizes.map((sizeField,index)=>(
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
            <br/>
            <div className={emptyFieldsError==='' ? '' : "alert alert-danger"} role="alert">
                  {emptyFieldsError}
              </div>
                  
              <div className={submitMessage==='' ? '' : submitMessage==='This product already exists' ? "alert alert-danger" : "alert alert-success"} role="alert">
                  {submitMessage}
              </div>
            <br/>
            <button type="submit" className="btn btn-primary btn-lg ">Create product</button>


        </form>

        </>
    )
}