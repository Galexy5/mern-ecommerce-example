const User = require('../models/category');
const jwt = require('jsonwebtoken');
const { jwtSecret , jwtExpire } = require('../config/keys');

exports.addCategoryController = async (req,res)=>{
    const {category} = req.body;

    
}