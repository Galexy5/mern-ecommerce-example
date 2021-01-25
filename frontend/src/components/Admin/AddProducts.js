import {useState} from 'react' ;
import {createProduct} from '../../api/product';


export default function AddProducts(){

    const [submitMessage,setSubmitMessage]= useState('')

    const [sizeInputs,setSizeInputs] = useState([
        {size:'',quantity:''}
    ])

    const [formData,setFormData]=useState({
        mainCategory:'Women',
        subCategory:'Sandals',
        productName:'',
        description:'',
        price:'',
    })

    const {mainCategory,subCategory,productName,description,price} = formData; 
   

    const addProduct = (event) =>{
        setFormData(
            {
                mainCategory:'Women',
                subCategory:'Sandals',
                productName:'',
                description:'',
                price:'',
            }
        )

        setSizeInputs([{size:'',quantity:''}])

        event.preventDefault();
            
            createProduct({
                form:formData,
                sizes: sizeInputs
            }).then(response=>{
                setFormData(
                    {
                        mainCategory:'Women',
                        subCategory:'Sandals',
                        productName:'',
                        description:'',
                        price:'',
                    }
                )
        
                setSizeInputs([{size:'',quantity:''}])

                setSubmitMessage(response.data.resp)
            })

       
    }

  

     const fieldsChange = (event) =>{

            setFormData({...formData, [event.target.name]:event.target.value})
       
     }

    const sizeChange =(index,event)=>{
        const values=[...sizeInputs];
        values[index][event.target.name]=event.target.value;
        setSizeInputs(values)

    }

    const addSize = ()=>{
      
        setSizeInputs([...sizeInputs, {size:'',quantity:''}])

    }

    const removeSize = (index)=>{
        const values= [...sizeInputs]
        values.splice(index,1)

        setSizeInputs(values)  
    }

    return (
        <>
        <form className="w-25" onSubmit={addProduct}>
            
            <label><h1>Main Category</h1></label>
            <select name="mainCategory" value={mainCategory} onChange={fieldsChange} className="form-select form-select-lg mb-3" aria-label="mainCategory">

                <option selected value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Accessories">Accessories</option>
            </select>
            <br/>

            <label><h1>Sub Category</h1></label>
            <select name="subCategory" value={subCategory} onChange={fieldsChange} className="form-select form-select-lg mb-3" aria-label="subCategory">

                <option selected value="sandals">Sandals</option>
                <option value="boots">Boots</option>
                <option value="sneakers">Sneakers</option>
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
                <input type="number" name="price" value={price} onChange={fieldsChange}  className="" style={{width:50}} aria-label="price" aria-describedby="inputGroup-sizing-lg"/><i className="fas fa-euro-sign"/>
            </div>
            <br/>


            <label class="custom-file-label" for="customFile"><h1>Upload photo</h1></label>
            <div className="custom-file">
                <input type="file" class="custom-file-input" id="photo"/>
            </div>
            <br/>
            <br/>

            <label><h1>Sizes</h1></label>
            
                
                

                {sizeInputs.map((sizeField,index)=>(
                    <div key={index}>
                        
                        <label><h3>Size</h3></label>
                        <input type="text" name="size" value={sizeField.size} onChange={event=>sizeChange(index,event)} style={{width:50}} aria-label="size" aria-describedby="inputGroup-sizing-lg"/>
                        

                      
                        <label><h3>Quantity</h3></label>
                        <input type="number" min='0' max='50' name="quantity" value={sizeField.quantity} onChange={event=>sizeChange(index,event)} style={{width:70}} aria-label="quantity" aria-describedby="inputGroup-sizing-lg"/>
                        
                        {sizeInputs.length>1 && 
                        (<button type="button" onClick={()=>removeSize(index)} className="btn btn-primary "><i className="fas fa-minus"/></button>) 
        
                    }
                        <button type="button" onClick={addSize} className="btn btn-primary"><i className="fas fa-plus"/></button>
                    </div>
                ))}
            
                
                  
           
            <br/>
            <button type="submit" className="btn btn-primary btn-lg ">Create product</button>


        </form>
        </>
    )
}