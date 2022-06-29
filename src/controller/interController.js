// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

const internModel = require('../model/internModel')

const validation = require('../controller/Validator')

const createIntern = async function(req,res)
{
    const data = req.body;
    const {name, email, mobile, collageId} = data;

    if(validation.isBodyEmpty(data)) return res.status(400).send({status:false, message:"Please provide required data"})
    
    // all mandatory tag is present or not
    if(!validation.isValid(name)) return res.status(400).send({status:false, message:"name tag is required"})
    if(!validation.isValid(email)) return res.status(400).send({status:false, message:"email tag is required"})
    if(!validation.isValid(mobile)) return res.status(400).send({status:false, message:"mobile tag is required"})
    if(!validation.isValid(collageId)) return res.status(400).send({status:false, message:"collageId tag is required"})

    if(validation.isVerifyString(name)) return res.status(400).send({status:false, message:"name doesn't contains any digit"})
    if(!validation.validateEmail(email)) return res.status(400).send({status:false, message:"Please provide a valid email"})
    // if(!validation.phoneNumberCheck(mobile)) return res.status(400).send({status:false, message:"Please provide a valid mobile number"})
    if(!validation.isValidOjectId(collageId)) return res.status(400).send({status:false, message:"Please provide a valid collageId"})

    // some key value is unique or not 
    if((await internModel.find({mobile:mobile})!=0)) return res.status(400).send({status:false, message:"please provide a unique collage name"})
    if((await internModel.find({email:email})!=0)) return res.status(400).send({status:false, message:"please provide a unique collage name"})



}

module.exports.createIntern = createIntern;