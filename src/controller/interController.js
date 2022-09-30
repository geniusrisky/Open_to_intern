// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

const internModel = require('../model/internModel')
const collegeModel = require('../model/collageModel')
const validation = require('../controller/Validator')

const createIntern = async function (req, res) {
    try {
        const data = req.body;
        const { name, email, mobile, collegeName } = data;

        if (validation.isBodyEmpty(data)) return res.status(400).send({ status: false, message: "Please provide required data" })

        // all mandatory tag is present or not
        if (!validation.isValid(name)) return res.status(400).send({ status: false, message: "name tag is required" })
        if (!validation.isValid(email)) return res.status(400).send({ status: false, message: "email tag is required" })
        if (!validation.isValid(mobile)) return res.status(400).send({ status: false, message: "mobile tag is required" })
        if (!validation.isValid(collegeName)) return res.status(400).send({ status: false, message: "collegeName tag is required" })


        if (validation.isVerifyString(name)) return res.status(400).send({ status: false, message: "name doesn't contains any digit" })
        if (!validation.validateEmail(email)) return res.status(400).send({ status: false, message: "Please provide a valid email" })
        if (!validation.isValidMobileNo(mobile)) return res.status(400).send({ status: false, message: "Please provide a valid mobile number" })


        let oneCollegeData= await collegeModel.findOne({name:collegeName , isDeleted:false});

        // if collage name not found then showing error
        if(!oneCollegeData) return res.status(404).send({ status: false, message: "College not found" })

        // if collage found then i am taking the collage id here which object found by giving specific collage name and condition 
        let collegeId= oneCollegeData._id;

        // mobile no is unique or not
        const isAlreadyExistsMob = await internModel.find({ mobile: mobile })
        if (isAlreadyExistsMob.length != 0) return res.status(400).send({ status: false, message: "This number is already exist" })

        //email is unique or not 
        const isEmailAlreadyExists = await internModel.find({ email: email })
        if (isEmailAlreadyExists.length != 0) return res.status(400).send({ status: false, message: "This email is already exist" })

        // here i am creating a new obect with specific keys
        const newData = { name, email, mobile, collegeId }

        // here i am performing db call to create a data, and here i am passing new Object
        const createdInternData = await internModel.create(newData)
        const outputData = { isDeleted: false, name: newData.name, email: newData.email, mobile: newData.mobile, collegeId: newData.collegeId }
        res.status(201).send({ status: true, data: outputData });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


let getInterns = async function (req, res) {
    try {

        // get college name from query params
        let collegeName = req.query.collegeName
        if (!collegeName || collegeName.trim() == "") return res.status(400).send({
            status: false,
            message: "College name must be required!"
        })

        // here i am creating a new object to set the key according to the responce 
        const output = {};

        // find college data by using college name
        const collegeData = await collegeModel.findOne({$or:[{name: collegeName.toLowerCase()},{name:collegeName.toUpperCase()}]} ,{isDeleted: false})

        // if collage not found by using above condtion then this line will be executed
        if (!collegeData) return res.status(404).send({ status: false, message: `College name related to '${collegeName}' is no exist!`})

        // get all interns[] related to this college _id
        const internsList = await internModel.find({collegeId: collegeData._id, isDeleted: false}).select({ name: 1, email: 1,mobile: 1})


        // here i set the key in the new object according to the responce ....
        output.name = collegeData.name
        output.fullName = collegeData.fullName
        output.logoLink = collegeData.logoLink
        output.interns = internsList

        res.status(200).send({data: output })

    }
    catch (error) {
     
        res.status(500).send({status: false,data: error.message})
    }
}

// make the module as a public 
module.exports.createIntern = createIntern;
module.exports.getInterns = getInterns