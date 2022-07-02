const express = require('express');
const mongoose = require('mongoose');
const route = require('./route/route');

const app = express();

app.use(express.json());

const url="mongodb+srv://skygupta:Z1Rn76vZdIBqi2FE@cluster0.333as.mongodb.net/group4Database";

mongoose.connect(url,{useNewUrlParser:true})
.then(()=> console.log("Mongodb is connected"))
.catch(err => cosnole.log(err));

app.use('/',route);

app.listen(process.env.PORT || 3000 , function(){
    console.log('Express app running on port ' + (process.env.PORT || 3000))
})
// 🏳️‍🌈 United in love! 🏳️‍🌈


