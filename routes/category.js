const express = require('express');
const router = express.Router();
const { addCategoryrController , } = require('../controllers/category');

router.post('/admin/dashboard/addcategory', addCategoryrController)





module.exports=router;