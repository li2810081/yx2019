var CryptoJS = require("crypto-js");
// 加密
//var str = '我是你爹';
	// 密钥 16 位
var	key= CryptoJS.enc.Utf8.parse('01c256def7834ab9');
	// 初始向量 initial vector 16 位
var iv= CryptoJS.enc.Utf8.parse('01c256def7834ab9');
	// key 和 iv 可以一致
var aesp = {	
	jiami:function(str){
		var encrypted = CryptoJS.AES.encrypt(str, this.key, {
			iv: this.iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});

		// 转换为字符串
		encrypted = encrypted.toString();

		return encrypted;
	},
	// mode 支持 CBC、CFB、CTR、ECB、OFB, 默认 CBC
	// padding 支持 Pkcs7、AnsiX923、Iso10126
	// NoPadding、ZeroPadding, 默认 Pkcs7, 即 Pkcs5

	// 解密
	jiemi: function(str){
		var decrypted = CryptoJS.AES.decrypt(encrypted, this.key, {
			iv: this.iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});

		// 转换为 utf8 字符串
		decrypted = CryptoJS.enc.Utf8.stringify(decrypted);

		return decrypted
	},
}


module.exports = aesp;