const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');
const ProductController = require('../controllers/product');
// const {authenticateJWT} = require('../middlewares/authenticator');


router.post('/newcategory', CategoryController.create);

router.post('/newproduct', ProductController.create);





module.exports=router;