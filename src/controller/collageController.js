// name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const collageModel = require('../model/collageModel')

const validation = require('../controller/Validator')

const createCollage = async function(req,res)
{
    try{
        const data = req.body;
        const {name,fullName, logoLink} = data;

        if(validation.isBodyEmpty(data)) return res.status(400).send({status:false, message:"Please provide required data"})
        if(!validation.isValid(name)) return res.status(400).send({status:false, message:"name tag is required"})
        if(!validation.isValid(fullName)) return res.status(400).send({status:false, message:"fullName tag is required"})
        if(!validation.isValid(logoLink)) return res.status(400).send({status:false, message:"logoLink tag is required"})


        if(validation.isVerifyString(name)) return res.status(400).send({status:false, message:"name doesn't contains any digit"})
        if(validation.isVerifyString(fullName)) return res.status(400).send({status:false, message:"fullName doesn't contains any digit"})

        if(!validation.isValidUrl(logoLink)) return res.status(400).send({status:false, message:"logoLink is not contains valid url"})

        if((await collageModel.find({name:name})!=0)) return res.status(400).send({status:false, message:"please provide a unique collage name"})
       

        const createdData = await collageModel.create(data);
        res.status(201).send({status:true,data:createdData})
       
    } catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}

module.exports = {
    createCollage
}