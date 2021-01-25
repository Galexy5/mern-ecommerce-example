const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
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
    sizes:{
        type: Array,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports=Product