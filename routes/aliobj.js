var express = require('express');
var router = express.Router();

var aliobj = require("../controllers/AliObjController.js");
// Get all aliobjs
router.get('/', aliobj.list);

// // Get single aliobj by id
//router.get('/show/:id', aliobj.show);

// // Create aliobj
router.get('/create', aliobj.create);

// // Save aliobj
router.post('/save', aliobj.save);

// // // Edit aliobj
router.get('/test', aliobj.test);

// // // Edit update
// router.post('/update/:id', aliobj.update);

// // // Edit update
// router.post('/delete/:id', aliobj.delete);


module.exports = router;