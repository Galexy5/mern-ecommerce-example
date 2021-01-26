const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');
const {authenticateJWT} = require('../middlewares/authenticator');


router.get('/women', authenticateJWT, CategoryController.getWomenCategories);




module.exports=router;