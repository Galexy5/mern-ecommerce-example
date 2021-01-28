const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');
const {authenticateJWT} = require('../middlewares/authenticator');


router.get('/women', CategoryController.getWomenCategories);

router.get('/men', CategoryController.getMenCategories);




module.exports=router;