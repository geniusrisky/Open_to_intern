// name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }

const collegeModel = require('../model/collageModel')

const validation = require('../controller/Validator')

const createCollege = async function(req,res)
{
    try{
        const data = req.body;
        
        let {name,fullName, logoLink} = data;
        name = name.toLowerCase();
        

        if(validation.isBodyEmpty(data)) return res.status(400).send({status:false, message:"Please provide required data"})
        if(!validation.isValid(name)) return res.status(400).send({status:false, message:"name tag is required"})

        if(!validation.isValid(fullName)) return res.status(400).send({status:false, message:"fullName tag is required"})
        if(!validation.isValid(logoLink)) return res.status(400).send({status:false, message:"logoLink tag is required"})

        name = name.trim()
        if(validation.isVerifyStringForAbbr(name)) return res.status(400).send({status:false, message:"name doesn't contains any digit or special symbol"})
        if(validation.isVerifyString(fullName)) return res.status(400).send({status:false, message:"fullName doesn't contains any digit or special symbol expect spce"})

        if(!validation.isValidUrl(logoLink)) return res.status(400).send({status:false, message:"logoLink is not contains valid url"})

        
        if((await collegeModel.find({name:name})!=0)) return res.status(400).send({status:false, message:"please provide a unique collage name"})
       
        //  url valid or not 
        // let regUrl=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-)[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-)[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S)?$/i
        // if (!logoLink.match(regUrl)) return res.status(400).send({ status: false, message: "Logo Link url is not valid" })
        let reg=  /^(ftp|http|https):\/\/[^ "]+$/
        if(!reg.test(logoLink)) return res.status(400).send({status:false, message:"Please provide a valid url"})
      
        const newData = {name,fullName, logoLink} 
        if(!validation.isValidAbbr(name,fullName)) return res.status(400).send({status:false,message:"Please provide a valid abbreviate name"})
        const createdData = await collegeModel.create(newData);
        const outputData = {name:newData.name,fullName:newData.fullName,logoLink:newData.logoLink,isDeleted:false}
        res.status(201).send({status:true,data:outputData})
       
    } catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}

module.exports = {
    createCollege
}