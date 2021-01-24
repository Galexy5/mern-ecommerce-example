const Category = require('../models/category');

exports.womenController= async (req,res)=>{

    await Category.find({main_category:'Women'},(err,womenCategories)=>{
        
        res.json([womenCategories])
    })
}