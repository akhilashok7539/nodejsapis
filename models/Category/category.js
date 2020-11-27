const mongoose = require('mongoose')

const catSchema = mongoose.Schema({

    Cat_name : {
        type: String,
        required:true
    },
    Cat_show:{
        type: String,
        enum: ["Show", "Hide"],
        default: 'Show'
    },
    Cat_state:{
        type: String,
        enum: ["Active", "Inactive"],
        default: 'Active'
    },
    Cat_img: {
        type: String,
        required:true,
    },
})

module.exports = mongoose.model('category',catSchema)