const express = require('express');
const router = express.Router();
const {addCategoryController} = require('../controllers/category')

router.post('/', addCategoryController);





module.exports=router;