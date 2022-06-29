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


const regex = /\d/;
const isVerifyString = function (string) {
    return regex.test(string)
};



module.exports ={ isBodyEmpty , isValid, isValidUrl, validateEmail, isVerifyString, isValidOjectId}