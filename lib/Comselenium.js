
require('chromedriver'); //导入chrome浏览器 driver
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var cheerio = require('cheerio');
var ph={
	//获取网页内文
	getBody:function(url,callbackFunction){
		driver.get(url);
		
        driver.quit();		
	},
	getDetailList:function(body,callbackFunction){
		$ = cheerio.load(body);
		var pj= $(".m-mobilephone").attr("data-no");
		callbackFunction(pj);
	}
	
}

module.exports =ph;