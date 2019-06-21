## node+mongod+layui

> 个人测试项目，我也忘记长啥样了


## 启动
 
> mongo服务 
``` 
mongod --dppath==/root/data/db/ 
                   --port 27017 
                   --fork 
                   --logpath /root/data/db/mongo.log
```
## 启动项目
1. 添加bin/www
2. 添加public下的pic和excel文件夹
3. 手动在mongo中添加users数据
4. `cnpm install`
5. `npm start`
6. [此处预览](http://localhost:3000/)

![皮一下](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561116190428&di=0b7c4a1cdbc2dc16770b55f8a8a250fe&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Ff7d489b116b8b46c.jpg )