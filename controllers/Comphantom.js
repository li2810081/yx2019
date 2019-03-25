var phantom = require('phantom');
var cheerio = require('cheerio');
var killpro = require('../lib/killprocess');

var ph = {
	//获取网页内文
	getBody: function (url, callbackFunction) {
		killpro("kill -9 `ps -aux|grep phantomjs|awk '{print $2}'`", function (msg) {
			if (msg) {
				console.log("\n----------------------------------------------------kill phantomjs---------------------------------------------\n")
			}
		});
		var sitepage = null;
		var phInstance = null;
		var htmltestcon = null;
		phantom.create()
		.then(instance => {
			phInstance = instance;
			return instance.createPage();
		})
		.then(page => {
			sitepage = page;
			return page.open(url);
		})
		.then(status => {
			console.log(status);
			return sitepage.property('content');
		})
		.then(content => {
			return callbackFunction(content);
			sitepage.close();
			phInstance.exit();
		})

		.catch(error => {
			console.log(error);
			phInstance.exit();
		});
	},
	getDetailList: function (body, callbackFunction) {

		$ = cheerio.load(body);
		var picrep = /\"https\:\/\/cbu01\.alicdn\.com\/cms\/upload\/other\/lazyload.png\" data-lazy-src\=/g;
		var pj = {
			Shop: {
				name: $(".name-wrap a").html(),
				urlshop: $(".name-wrap a").attr("href"),
				wangwang: $(".ww-inline.ww-online").attr("href"),
				isfactory: $(".biz-type-model").html(),
				address: $(".item.address.fd-clr span").html()
			},
			Product: {
				p_id: $('meta[name="b2c_auction"]').attr("content"),
				mainpic: $('meta[property="og:image"]').attr("content"),
				title: $('meta[property="og:title"]').attr("content"),
				description: $('meta[property="og:description"]').attr("content"),
				price: $('meta[property="og:product:price"]').attr("content"),
				list: $('.table-sku').html().replace(/amount/g, "layui-hide").replace(/\.32x32/g, "").replace(picrep, ""),
				outdetail: $('.attributes-item.mod-info kuajing-attribues').html(),
				moredetail: $("#mod-detail-attributes div table").html()
			}
		}; //.attr("data-no");
		callbackFunction(pj);
	}

}

module.exports = ph;
