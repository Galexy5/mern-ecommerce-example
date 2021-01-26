const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    main_category:{
        type: String,
        trim: true,
        required: true
    },
    sub_category:{
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true});


const Category = mongoose.model('Category', categorySchema);

module.exports=Category;