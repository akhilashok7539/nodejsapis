const mongoose = require('mongoose')

const shopSchema = mongoose.Schema({

    shop_name : {
        type: String,
        required:true
    },
    shop_cat:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },
    shop_add:{
        type: String,
        required:true,
    },
    shop_ph: {
        type: Number,
        required:true,
    },
    open_time:{type:String, required:true},
    clos_time:{type:String, required:true},
    shop_show:{
        type: String,
        enum: ["Show", "Hide"],
        default: 'Show'
    },
    shop_state:{
        type: String,
        enum: ["Active", "Inactive"],
        default: 'Active'
    },
    minimum:{type:Number,required:true,default:1},
    shop_disc:{type:String,required:true},
    shop_discamount:{type:Number,required:true},

    shop_img:{type:String},
    pickup:{type:Number,required:true},
    delivery:{type:Number,required:true}

})

module.exports = mongoose.model('shop',shopSchema)