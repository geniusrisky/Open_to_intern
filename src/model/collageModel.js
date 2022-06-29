// name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const collageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    logoLink:{
        type:String,
        required: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    
    
});
module.exports = mongoose.model('collage-data',collageSchema);