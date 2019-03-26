var mongoose = require("mongoose");
var Detail = require("../models/Detail");
var Product = require("../models/Product");
var Shop = require("../models/Shop");
var phantom = require("../lib/Comphantom.js");
var exportExcel = require("../lib/ejsexcel");
var fs = require('fs');
var download = require('download');
//var tanslate = require('../lib/selfTranslate.js')

var mainController = {};

mainController.index = function(req, res) {
	res.render("../views/main/index");
};

// Show List View
mainController.list = function(req, res) {
	var dataArr = {
		code: 0,
		msg: "",
		count: 1000,
		data: []
	};
	var arr = {};
	if (req.body.description) {
		var reg = new RegExp(req.body.description, 'i')
		arr = {
			description: {
				$regex: reg
			}
		}
	}
	var query = Product.find(arr, {
		p_id: 1,
		mainpic: 1,
		title: 1,
		price: 1,
		shop: 1,
		updated_at: 1,
		description: 1
	});
	query.count(function(err, count) {
		return count;
	}).then(count => {
		Product.find(arr).limit(req.body.limit)
			.skip(req.body.limit * (req.body.page - 1))
			.exec(function(err, products) {
				if (err) {
					console.log("Product.find Error:", err + Product.find({}).count());
				} else {
					dataArr.data = products;
					dataArr.count = count;
					res.json(dataArr);
				}
			});
	})
};

mainController.show = function(req, res) {
	Product.findOne({
		p_id: req.params.id
	}).exec(function(err, product) {
		if (err) {
			console.log("Error:", err);
		} else {
			res.render("../views/main/show", {
				product: product
			});
		}
	});
};

mainController.add = function(req, res) {
	res.render("../views/main/add");
};

mainController.create = function(req, res) {
	var url = req.body.url;
	if (url) {
		phantom.getBody(url, function(body) {
			phantom.getDetailList(body, function(data) {
				res.json(data);
			})
		})
	} else {
		res.render("../views/main/add");
	}
};

//Save Post
mainController.save = function(req, res) {
	var result = {
		p: {
			success: false,
			msg: ""
		},
		s: {
			success: false,
			msg: ""
		}
	};
	var _product = new Product(JSON.parse(req.body.product));
	var _shop = new Shop(JSON.parse(req.body.shop));

	Product.findOne({
		p_id: _product.p_id
	}).exec(function(err, pro) {
		if (!pro) {
			product_save(_product);
		} else {
			result.p.msg += "product is exet !";
			shop_find(_shop);
		}
	});

	function shop_find(_shop) {
		Shop.findOne({
			name: _shop.name
		}).exec(function(err, shop) {
			if (!shop) {
				shop_save(_shop);
			} else {
				result.s.msg += "shop is exet !";
				res.json(result);
			}
		});

	}

	function product_save(_product) {
		_product.shop = _shop.name;
		_product.save(function(err) {
			if (err) {
				console.log(err);
				result.p.msg += err;
				res.json(result);
			} else {
				result.p.success = true;
				console.log("successfully created an Product.");
				result.p.msg += "successfully created an Product.";
				shop_save(_shop);
			}
		});
	}

	function shop_save(_shop) {
		_shop.save(function(err) {
			if (err) {
				console.log(err);
				result.s.msg += err;
				res.json(result);
			} else {
				result.s.success = true;
				console.log("successfully created an Shop.");
				result.s.msg += "successfully created an Shop.";
				res.json(result);
			}
		});
	}

};

mainController.edit = function(req, res) {
	Employee.findOne({
		_id: req.params.id
	}).exec(function(err, employee) {
		if (err) {
			console.log("Error:", err);
		} else {
			res.render("../views/employees/edit", {
				employee: employee
			});
		}
	});
};

mainController.update = function(req, res) {
	Employee.findByIdAndUpdate(req.params.id, {
		$set: {
			name: req.body.name,
			address: req.body.address,
			position: req.body.position,
			salary: req.body.salary
		}
	}, {
		new: true
	}, function(err, employee) {
		if (err) {
			console.log(err);
			res.render("../views/employees/edit", {
				employee: req.body
			});
		}
		res.redirect("/employees/show/" + employee._id);
	});
};

mainController.delete = function(req, res) {
	var _data = req.body.dt;
	//res.json(_data);
	Product.remove({
		p_id: _data[0].p_id
	}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log(_data[0].title+" deleted!");
			res.json({msg:_data[0].title+" 已删除"});
		}
	});
};

mainController.model_exportToExcel = function(req, res) {
	//console.log(req.body.data);
	var _data = req.body.data;
	console.log("开始处理数据！。。。。。。。")
	//console.log(_data[0])



	var i = 0;

	function load(_data) {
		_data[i].pic = "./public/pic/" + _data[i].p_id + ".jpg";
		//console.log(_data[i]);
		download(_data[i].mainpic).then(data => {
			fs.writeFileSync('./public/pic/' + _data[i].p_id + '.jpg', data);
			//_data[i].mainpic="../public/pic/"+ _data[i].p_id + '.jpg';
			if ((i + 1) < _data.length) {
				i++;
				load(_data);
				console.log('Loadding...' + _data[i].pic)
			} else {
				reExcel(_data, req)
			}
		});
	}
	// 	_data.map(async function(sgdata, index) {
	// 		var res = await tanslate(sgdata.title)
	// 			.then((res) => {
	// 				console.log(index + "  before : " + sgdata.title)
	// 				console.log(index + "  res : " + res)
	// 				sgdata.title = res;
	// 				console.log(index + "  after : " + sgdata.title)
	// 				if (index + 1 == _data.length) {}
	// 			})
	// 	})
	load(_data);

	function reExcel(_data, req) {
		var msgstr = exportExcel("./models/Excel/engmodel.xlsx", _data, "./public/excel/" + req.body.mark + ".xlsx")

			.then(msgstr => {
				res.json(msgstr);
			})
	}
}

module.exports = mainController;
