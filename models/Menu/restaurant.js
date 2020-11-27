const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({

    menu_name : {
        type: String,
        required:true
    },
    menu_desc:{
        type: String,
        required:true,
        max:20
    },
    menu_type:{
        type: String,
        enum: ["Veg", "Non Veg"],
        required:true
    },
    menu_ctype: {
        type: String,
        enum: ["Starter", "Arabian"],
        required:true
    },
    menu_img:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('menurestaurant',menuSchema)