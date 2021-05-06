const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        // require:true,
    },
    phone:{
        type:String,
        // required:true,
    }
},
    {
        timestamps: true
    }
)

var Users = mongoose.model('User',userSchema);
module.exports= Users;