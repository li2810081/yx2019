const Translator = require('./translator');
let translator = new Translator();

// config the translator
translator.config = {
  from: 'zh_CHS', // zh-CHS(中文) || ja(日语) || EN(英文) || fr(法语) ...
  to: 'EN',
  appKey: '27e730ae8f9cc222', // https://ai.youdao.com 在有道云上进行注册
  secretKey: 'jA6hG8MVx17kDmZLm5aVaWs2ebPUf5g9'
}

async function translateString(str) {
  let resultStr = await translator.translate(str)
	.then(resultStr=>{
		 //console.log(resultStr.translation[0]);
		 return resultStr.translation[0];
	})
 
}

module.exports=translateString;