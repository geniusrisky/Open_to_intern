
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:Number,
        unique:true
    },
    collegeId:{
        type:ObjectId,
        ref:"collage-data",
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
});
module.exports = mongoose.model('intern-data',internSchema);