const Product = require('../models/product');

exports.create= async (req,res)=>{



    const {mainCategory,subCategory,productName,description,price} = req.body
    const {filename} = req.file
    const {sizes} = JSON.parse(req.body.sizes)



    const new_product = new Product({
        name:productName,
        description:description,
        main_category:mainCategory,
        sub_category:subCategory,
        price:price,
        productPhoto: filename,
        sizes:sizes
    })

    await new_product.save().then(()=>{
        res.json({resp:"Product created successfully"})
    }).catch(error=>{
        res.json({error:`Error in product save: ${error}`})
    })

    

}