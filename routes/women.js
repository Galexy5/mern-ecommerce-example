const express = require('express');
const router = express.Router();
const {womenController}=require('../controllers/women');

router.get('/',womenController);




module.exports=router;