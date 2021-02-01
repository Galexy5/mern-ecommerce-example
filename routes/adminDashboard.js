const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');
const ProductController = require('../controllers/product');
const {authenticateJWT} = require('../middlewares/authenticator')
const upload = require('../middlewares/multer')


router.post('/newcategory', authenticateJWT, CategoryController.create);

router.post('/newproduct', authenticateJWT, upload.single('productPhoto'), ProductController.create);

router.post('/editproduct', authenticateJWT, upload.single('productPhoto'), ProductController.editProduct);





module.exports=router;