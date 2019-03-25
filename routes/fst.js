var express = require('express');
var router = express.Router();

var fst = require("../controllers/fstController.js");

// Get all fsts
router.get('/', fst.list);

// Get single fst by id
router.get('/show/:id', fst.show);

// Create fst
router.get('/create', fst.create);

// Save fst
router.post('/save', fst.save);

// Edit fst
router.get('/edit/:id', fst.edit);

// Edit update
router.post('/update/:id', fst.update);

// Edit update
router.post('/delete/:id', fst.delete);


module.exports = router;
