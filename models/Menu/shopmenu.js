const mongoose = require('mongoose')

const shopmenuSchema = mongoose.Schema({

    menu :{ type: String, required:true},
    menu_desc:{ type: String,required:true},
    disp_det:{ type: String,required:true},
    prate: { type: String,required:true},
    rate:{ type:Number,required:true},
    salesrate:{ type:Number,required:true},
    disc:{ type:String, required:true},
    discamount:{type:Number,required:true},
    avfrom:{ type:Date,required:true},
    avto:{ type:Date,required:true},
    active:{
        type: String,
        enum: ["Active", "Inactive"],
        required:true
    },
    show:{
        type: String,
        enum: ["Show", "Hide"],
        required:true
    },

})

module.exports = mongoose.model('shopmenu',shopmenuSchema)