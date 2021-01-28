const Category = require('../models/category');


exports.create = async (req,res)=>{

    const {mainCategory, newCategory} = req.body;
    

    await Category.findOne({sub_category: newCategory}, async (err, category)=>{
        
       
        if((category && category.main_category===mainCategory) ) return res.json({resp: "This category already exists"})

        const new_category= new Category({main_category:mainCategory,sub_category:newCategory});

        await new_category.save()
        .then(()=>{
            res.json({resp:"The category saved successfully"});
        })
        .catch(err=>{
            res.json({error:'Error in category save'})
        })
    })



    
}

exports.getWomenCategories= async (req,res)=>{

    await Category.find({main_category:'Women'},(err,womenCategories)=>{
        
        res.json(womenCategories)
    })
}

exports.getMenCategories= async (req,res)=>{

    await Category.find({main_category:'Men'},(err,MenCategories)=>{
        
        res.json(MenCategories)
    })
}