const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');
const {authenticateJWT} = require('../middlewares/authenticator');


router.get('/women', CategoryController.getWomenCategories);




module.exports=router;