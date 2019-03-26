var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,    
    level: Number,
    updated_at: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('User', UserSchema);  
