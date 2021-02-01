const Product = require('../models/product');


exports.create= async (req,res)=>{



    const {mainCategory,subCategory,productName,description,price,sizes} = req.body
    const {filename} = req.file

    


    const new_product = new Product({
        name:productName,
        description:description,
        main_category:mainCategory,
        sub_category:subCategory,
        price:price,
        productPhoto: filename,
        sizes: JSON.parse(sizes)
    })

    await new_product.save().then(()=>{
        res.json({resp:"Product created successfully"})
    }).catch(error=>{
        res.json({error:`Error in product save: ${error}`})
    })

    

}


exports.getProducts= async (req,res)=> {
    const products= await Product.find();
    res.json(products)
}

exports.editProduct = async (req,res) => {

    const {_id,mainCategory,subCategory,productName,description,price,sizes} = req.body
     let  filename = ''


    if (req.file===undefined){
        filename = req.body.productPhoto
    }else{
        filename = req.file.filename
    }

    const updatedProduct ={
        name:productName,
        description:description,
        main_category:mainCategory,
        sub_category:subCategory,
        price:price,
        productPhoto: filename,
        sizes: JSON.parse(sizes)

    }

    await Product.findOneAndUpdate(
        {_id: _id},
        {$set: updatedProduct},{useFindAndModify: false},
        (err,success)=>{
            if (err){
                res.json({error: `Error in product update: ${err}`})
            }else{
                res.json({resp: 'Product updated successfully !!'})
            }
    })
}