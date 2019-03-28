var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    : String,
    o_id: String,
    position: String,
    salary: Number,
    updated_at: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('Order', OrderSchema);  
