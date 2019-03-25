var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
		p_id:String,
		mainpic: String,
		title: String,
		description: String,
		price: String,
		list: String,
		shop:String,
		outdetail: String,
		moredetail: String,
		updated_at: {
			type: Date,
		default:
			Date.now
		}
	});

module.exports = mongoose.model('Product', ProductSchema);
