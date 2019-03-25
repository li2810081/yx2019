var https = require("https");
var fs = require("fs");

//var url = "https://cbu01.alicdn.com/img/ibank/2019/078/901/10347109870_692250814.310x310.jpg";

var loadpic = (url, picname, res) => {
	result = {
		success: false,
		msg: ""
	};
	try {
		https.get(url, function (res) {
			var imgData = "";
			res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
			res.on("data", function (chunk) {
				imgData += chunk;
			});
			res.on("end", function () {
				fs.writeFile('./public/pic/' + picname + ".jpg", imgData, "binary", function (err) {
					if (!err) {
						result.success = true;
						console.log('下载成功:/public/pic/' + picname + ".jpg");
						result.msg = "下载成功" + url;
					}
				});
			});
		});
	} catch (err) {
		console.log(" 下载图片出现问题：" + err)
		result.msg = " 下载图片出现问题：" + err;
	}
	return result;
}

module.exports = loadpic;
