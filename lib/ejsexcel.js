var ejsexcel = require("ejsExcel");
var fs = require("fs");
var util = require("util");
var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);


var toExcel=async function (model,data,output) {
	result={success:false,msg:""};
	try{
	//获得Excel模板的buffer对象
	const exlBuf = await readFileAsync(model);
	//数据源	
	//用数据源(对象)data渲染Excel模板
	const exlBuf2 = await ejsexcel.renderExcel(exlBuf, data);
	await writeFileAsync(output, exlBuf2);
	console.log("生成"+output);
	result.success=true;
	result.msg="成功生成"+output;
	}catch(err){
		console.log(" 生成excel出现问题："+err)
		result.msg=" 生成excel出现问题："+err;
	}
	return result;
};


module.exports=toExcel;