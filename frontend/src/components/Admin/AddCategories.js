export default function AddCategories(){

    return (
        <>
        
    <form>

            <label><h1>Main Category</h1></label>
            <select name="selectCategory" className="form-select form-select-lg mb-3" aria-label="selectCategory">

                <option selected value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Accessories">Accessories</option>
            </select>
            <br/>
            <br/>
            <label><h1>New Category</h1></label>
            <div className="input-group input-group-lg">
                <input type="text" name="newCategory" className="form-control" aria-label="newCategory" aria-describedby="inputGroup-sizing-lg"></input>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary btn-lg ">Create Category</button>
            
    </form>
        
       </>
    )
}