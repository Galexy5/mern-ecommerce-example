const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    main_category:{
        type: String,
        required: true
    },
    sub_category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    productPhoto:{
        type: String,
        required: true
    },
    sizes:{
        type: Array,
        required: true
    }
},{timestamps: true})

const Product = mongoose.model('Product', productSchema);

module.exports=Product