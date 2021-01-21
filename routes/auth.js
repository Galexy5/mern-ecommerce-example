const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { jwtSecret , jwtExpire } = require('../config/keys')

router.post('/register', async (req,res)=>{
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


router.post('/login', async (req,res)=>{
    const {username,password} = req.body



        try {
            await User.findOne({username:username}, async (err,user)=>{
                if(!user){
                    return res.status(401).json({submitMsg: `Invalid credentials`})
                }else{
                    if(!await bcrypt.compare(password,user.password)) return res.status(401).json({submitMsg: 'Invalid credentials'})
                    
                    const payload={
                        user: {
                            _id: user._id
                        }
                    }
        
                    jwt.sign(payload, jwtSecret , {expiresIn: jwtExpire}, (err,token)=>{
                        if (err) return console.log('Jwt error: ', err)
        
                        const { _id, username, email, role } = user
        
                        res.json({
                            token,
                            user: { _id , username , email, role }
                        })
                    } )
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({error: `Server error ${error}`})
        }

  
})


module.exports=router;
