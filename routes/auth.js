const express= require('express');
const router=express.Router();
const bcrypt = require('bcrypt');
const User=require('../models/users');

router.post('/', async (req,res)=>{
    const {username,email,password} = req.body ;
    await User.findOne({email:email},async (err,user)=>{
        if (user) return res.json({submitMsg:"This email already exists"})

        const salt = await bcrypt.genSalt(10);


        const new_user = new User({
            username:username,
            email:email,
            password: await bcrypt.hash(password, salt)
        });

       

        new_user.save(err=>{
            if (err){
                res.json({error:"Error in user save"})
            }else{
                res.json({submitMsg:'Registration completed !!'})
            }
          
        });



    })
    

})

module.exports=router;
