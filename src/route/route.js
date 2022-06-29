const express = require('express')
const router = express.Router();
const collageController = require('../controller/collageController');
const internController = require('../controller/interController');


router.post('/functionup/colleges',collageController.createCollage)
router.post('/functionup/interns',internController.createIntern)
router.get('/interns',internController.getInterns)
// router.get(' /functionup/collegeDetails',internController)

module.exports = router;