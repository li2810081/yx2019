var process = require('child_process');

//kill -9 `ps -aux|grep phantomjs|awk '{print $2}'`
var shell = function (shelldb,callback) {
	process.exec(shelldb, function (error, stdout, stderr) {
		console.log(stdout);
		callback(stdout);	
		if (error !== null) {
			console.log('exec error: ' + error);
		}else{
					
		}
	});
} 

module.exports = shell;
