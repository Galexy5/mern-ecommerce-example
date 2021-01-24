const Category = require('../models/category');
const jwt = require('jsonwebtoken');
const { jwtSecret , jwtExpire } = require('../config/keys');

exports.addCategoryController = async (req,res)=>{

    const {mainCategory, newCategory} = req.body;
    

    await Category.findOne({category:newCategory}, async (err, category)=>{
        if(category && category.main_category===mainCategory) return res.json({resp: "This category already exists"})

        const new_category= new Category({category:newCategory,main_category:mainCategory});

        await new_category.save()
        .then(()=>{
            res.json({resp:"The category saved successfully"});
        })
        .catch(err=>{
            res.json({error:'Error in category save'})
        })
    })
    
}