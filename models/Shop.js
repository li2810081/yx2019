var mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema({
		name: String,
		urlshop: String,
		wangwang: String,
		isfactory: String,
		address:String,
		updated_at: {
			type: Date,
		default:
			Date.now
		}
	});

module.exports = mongoose.model('Shop', ShopSchema);
