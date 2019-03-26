var express = require('express');
var router = express.Router();

var main = require("../controllers/MainController.js");
// Get all aliobjs
router.get('/', main.index);


router.post('/model_exportToExcel',main.model_exportToExcel)
// // Get single aliobj by id
//router.get('/show/:id', main.show);
router.post('/list', main.list);
// // Create aliobj
router.get('/add', main.add);

// // Save aliobj
router.post('/save', main.save);

// // // Create aliobj
router.post('/create', main.create);

// // // Edit update

//router.post('/update/:id', main.update);

// // // Edit update
router.post('/delete', main.delete);


module.exports = router;