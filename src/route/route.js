const express = require('express')
const router = express.Router();
const collageController = require('../controller/collageController');
const internController = require('../controller/interController');


router.post('/functionup/colleges',collageController.createCollege)
router.post('/functionup/interns',internController.createIntern)
router.get('/functionup/collegeDetails',internController.getInterns)


module.exports = router;