var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employees = require('./routes/employees');

var mainrouter = require('./routes/main');
var fstrouter = require('./routes/fst');
var killpro = require('../lib/killprocess');
var app = express();

//connect to MongoDb
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
killpro("ps -aux|grep 'mongod'|gawk '{  print $11 }'|grep 'mongod'", function(msg) {
	if (msg == "") {
		killpro("mongod --dbpath=/root/data/db --port 27017 --fork --logpath=/root/data/db/mongo.log", function(msg) {
			console.log(msg)
		})
	}
})



mongoose.connect('mongodb://192.168.2.4:27017/wwwdb', {
		useNewUrlParser: true,
		dbName: "wwwdb",
		keepAlive: true,
		socketTimeoutMS: 540000
	})
	.then(() => console.log('connection succesful to mongodb'))
	.catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 下面三行设置渲染的引擎模板
// app.set('views', __dirname); //设置模板的目录
// app.set('view engine', 'html'); // 设置解析模板文件类型：这里为html文件
// app.engine('html', require('ejs').__express); // 使用ejs引擎解析html文件中ejs语法


// 使用 session 中间件
app.use(session({
	secret: 'secret', // 对session id 相关的cookie 进行签名
	resave: true,
	saveUninitialized: false, // 是否保存未初始化的会话
	cookie: {
		maxAge: 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
	},
}));

app.use(logger('dev'));
app.use(express.json({
	limit: '50mb'
}));
app.use(express.urlencoded({
	limit: '50mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 获取登录页面
// app.get('/login', function(req, res){
// res.sendFile(__dirname + '/login.html')
// });

app.get('/login', function(req, res) {
	res.render('../views/login');
})


// 用户登录
app.post('/login', function(req, res) {
	if (req.body.username == 'yangxu2019' && req.body.password == '123456xy') {
		req.session.userName = req.body.username; // 登录成功，设置 session
		res.json({
			ret_code: 1,
			ret_msg: '登录成功'
		}); // 若登录失败，重定向到登录页面
		//res.redirect('/');
	} else {
		res.json({
			ret_code: 0,
			ret_msg: '账号或密码错误'
		}); // 若登录失败，重定向到登录页面
	}
});


function Islogin(req, res, next) {
	if (req.session.userName) { //判断session 状态，如果有效，则返回主页，否则转到登录页面
		console.log("验证通过")
		next()
	} else {
		console.log("非法访问,重定向")
		res.redirect('login');
	}
}
// 退出
app.get('/logout', function(req, res) {
	req.session.userName = null; // 删除session
	res.redirect('login');
});

//拦截所有请求进行确认登录状态
app.use('*', Islogin);

//主页菜单头
app.get('/', (req, res, next) => {
	res.render('../views/index', {
		nav: [{
				name: "产品表单",
				src: "/main/"
			}, {
				name: "添加产品",
				src: "/main/add"
			}

		]
	});
});


app.use('/main', mainrouter);
app.use('/fst', fstrouter);
//app.use('/users', usersRouter);
//app.use('/employees', employees);
//app.use('/aliobj', aliobjrouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
