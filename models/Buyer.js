var mongoose = require('mongoose');

var BuyerSchema = new mongoose.Schema({
    name: String,
    address: String,
    position: String,
    salary: Number,
    updated_at: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('Buyer', BuyerSchema);  
