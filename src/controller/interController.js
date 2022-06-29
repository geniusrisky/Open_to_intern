// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

const internModel = require('../model/internModel')
const collageModel = require('../model/collageModel')

const validation = require('../controller/Validator')

const createIntern = async function(req,res)
{
    try{
    const data = req.body;
    const {name, email, mobile, collegeId} = data;

    if(validation.isBodyEmpty(data)) return res.status(400).send({status:false, message:"Please provide required data"})
    
    // all mandatory tag is present or not
    if(!validation.isValid(name)) return res.status(400).send({status:false, message:"name tag is required"})
    if(!validation.isValid(email)) return res.status(400).send({status:false, message:"email tag is required"})
    if(!validation.isValid(mobile)) return res.status(400).send({status:false, message:"mobile tag is required"})
    if(!collegeId || collegeId ==undefined) return res.status(400).send({status:false, message:"collageId tag is required"})


    if(validation.isVerifyString(name)) return res.status(400).send({status:false, message:"name doesn't contains any digit"})
    if(!validation.validateEmail(email)) return res.status(400).send({status:false, message:"Please provide a valid email"})
    // if(!validation.phoneNumberCheck(mobile)) return res.status(400).send({status:false, message:"Please provide a valid mobile number"})
    if(!validation.isValidOjectId(collegeId)) return res.status(400).send({status:false, message:"Please provide a valid collageId"})


    // mobile no is unique or not
     const isAlreadyExistsMob = await internModel.find({mobile:mobile})
     if(isAlreadyExistsMob.length!=0) return res.status(400).send({status:false, message:"This number is already exist"})

     //email is unique or not 
     const isEmailAlreadyExists = await internModel.find({email:email})
     if(isEmailAlreadyExists.length!=0) return res.status(400).send({status:false, message:"This email is already exist"})

     // collage id is present in db or not 
     const isCollegeIdPresent = await collageModel.findById(collegeId)
     if(Object.keys(isCollegeIdPresent).length==0) return res.status(400).send({status:false, message:`Collage not found by this collageId ${collegeId}` })

    const createdInternData = await internModel.create(data)
    res.status(201).send({status:true, data:createdInternData});

    }catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}

module.exports.createIntern = createIntern;