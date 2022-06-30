const validUrl = require('valid-url');

const objectId = require('mongoose').Types.ObjectId

// check body is empty or not
const isBodyEmpty = function(data)
{
    if(Object.keys(data).length == 0) return true
    return false;
}

// validation for empty or not / key present or not
const isValid = function(value)
{
    if(typeof value === 'undefined' || value === null ) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidOjectId = function(id)
{
    if(objectId.isValid(id)) return true;
    return false;
}

const isValidUrl = function(url)
{
    if (validUrl.isUri(url)) return true;
    return false
}

const validateEmail = function (mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
};

// For collage Name abbr..
const regex1 = /[ `/\d/!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
const isVerifyStringForAbbr = function (string) {
    return regex1.test(string)
};


// const regex = /\d/; // For fullName validation
const regex = /[`/\d/!@#$%^&*()_+\=\[\]{};':"\\|.<>\/?~]/
const isVerifyString = function (string) {
    return regex.test(string)
};

const regEx=/^[6-9]\d{9}$/
const isValidMobileNo = function(mobno)
{
    return regEx.test(mobno)
}


// check abbr name is valid or not 
const isValidAbbr = function(name,fullName)
{
    let fullname1=fullName.replace(","," ")
    let fullname2=fullname1.replace("-"," ");
    let nameArr = fullname2.split(" ") 
    let abbr =''
    for(let i=0;i<nameArr.length;i++)
        {
            let temp =nameArr[i].charAt(0) 
            abbr = abbr+temp 
        }
    if(abbr.toUpperCase() == name.toUpperCase() ) 
    {
        return true
    }
    else return false
}



module.exports ={ isBodyEmpty , isValid, isValidUrl, validateEmail, isVerifyString, isValidOjectId , isValidMobileNo,isVerifyStringForAbbr,isValidAbbr}