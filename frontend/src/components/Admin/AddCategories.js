import {useState} from 'react';
import {addCategory} from '../../api/category';

export default function AddCategories(){

    const [category,setCategory]=useState({
        mainCategory:'Women',
        newCategory:''
    });

    const [submitMessage,setSubmitMessage] = useState('')

    const {mainCategory,newCategory} = category;

    const createCategory = (event)=>{
        event.preventDefault()
        if(newCategory!==''){
            addCategory(category)
            .then((response)=>{ //SUCCESS
                setCategory({...category,[newCategory]:''})
                console.log({mainCategory})
                setSubmitMessage(response.data.resp)
                console.log(response.data.resp)
                
            })
        }
    }

    const change = (event)=>{
       
        setCategory({...category,[event.target.name]:event.target.value})
        setSubmitMessage('')
        
    }

    return (
        <>
        
    <form onSubmit={createCategory}>

            <label><h1>Main Category</h1></label>
            <select name="mainCategory" onChange={change}  className="form-select form-select-lg mb-3" aria-label="mainCategory">

                <option selected value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Accessories">Accessories</option>
            </select>
            <br/>
            <br/>
            <label><h1>New Category</h1></label>
            <div className="input-group input-group-lg">
                <input type="text" name="newCategory" value={newCategory} onChange={change}  className="form-control" aria-label="newCategory" aria-describedby="inputGroup-sizing-lg"></input>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary btn-lg ">Create Category</button>
         

    </form>
    <div className={submitMessage==='' ? '' : submitMessage==='This category already exists' ? "alert alert-danger" : "alert alert-success"} role="alert">
                  {submitMessage}
              </div>

       </>
    )
}