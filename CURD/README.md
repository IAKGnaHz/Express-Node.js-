# Node 笔记
## Express 的使用与安装

+ 安装 `express` 

```
npm install express --save
```

[Express官方网站](http://www.expressjs.com.cn)

+ 使用示例


```javascript
const express = require('express)

var app = express()

// 使用 use 开放静态资源文件夹 当以路由 /public/ 访问时 自动到目录下查找

app.use('/public/',express.static('./public/'))

// 使用 get 响应 get 请求 
app.get('/', function (req, res) {
  res.send('hello world')
})

// 开放 3000 端口
app.listen(3000, function () {
  console.log('express app is running ...')
})

```
+ 在 express 中使用 渲染模板  art-template 


```js
// 安装 express-art-template 包
npm install express-art-template --save

// 安装 art-template 包
npm install art-template --save


// 引入 art-template 包
const template = require('art-template')

//启动 渲染模板 表示遇到 html 结尾的使用渲染模板
app.engine('html', require('express-art-template'))

```

示例


```js
// 使用 render() 函数进行渲染
// 注意的是 这里会自动去找 views 中的数据 如果想要引入 views 中的别的 使用相对路径
app.get('/',function (req,res) { 
  res.render('index.html',{
    comments : comments
  })
 })
 
// 如果想要修改默认的 views 目录，则可以
app.set('views', render函数的默认路径)
```

+ 使用 express 处理 post 请求 


```js
// 安装 body-parser
npm i body-parser --save
// 在文件中 引入 body-parser
var bodyParser = require('body-parser')

// 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

```

+ 处理 post 请求时 需要 在 form 表单中将 active 处理为 post

```js
app.post('/post', function (req, res) {
  var comment = req.body
  console.log(comment)
  comment.dateTime = '2018-02-22'
  comments.unshift(comment)
  res.redirect('/')
})
```

```html
<form action="/post" method="post">
      <div class="form-group">
        <label for="input_name">你的大名</label>
        <input type="text" class="form-control" required minlength="2" maxlength="10" id="input_name" name="name"
          placeholder="请写入你的姓名">
      </div>
      <div class="form-group">
        <label for="textarea_message">留言内容</label>
        <textarea class="form-control" name="message" id="textarea_message" cols="30" rows="10" required minlength="5"
          maxlength="20"></textarea>
      </div>
      <button type="submit" class="btn btn-default">发表</button>
</form>
```


+ express 提供的路由模块 


```js
router.js

const express = require('express')

// 1.创建一个路由容器
const router = express.Router()

// 2.将路由都挂载到了 router 路由容器中去
router.get('/xxx',function(req,res){
    ...
})
router.get('/xxx',function(req,res){
    ...
})
router.get('/xxx',function(req,res){
    ...
})

// 向外暴露 router 
module.exports = router 
```


``` js
app.js

// 引入 router 文件地址为相对路径
conster router = require('./router')

// 将路由容器挂载到了 app 服务中
app.use(router)
```


# Express CRUD 
## 内容结构


```
express-crud

.
|---public          //用于自定义样式的加载
|       |--css
|       |--js
|       |--image
|---views           // 路由切换时各个html文件 
|       |--index.html
|       |--new.html
|       |--edit.html
|---app.js          //入口模块 
|
|---db.json         //数据采用文件的方式存储
|
|---router.js       //处理路由设计 不关心业务模块
|   
|---student.js      //数据文件操作模块       
```

## 路由设计

| 请求方法 | 请求路径 | get参数 | post参数 | 备注 |
| --- | --- | --- | --- | --- |
| GET | /students |  |   | 渲染首页 |
| GET | /students/new |  |  | 渲染添加学页面(增)  |
| POST | /students/mew |  | name,age,gender,hobbies | 处理添加学生请求 |
| GET | /students/edit | id |  | 渲染信息编辑页面页面(查)  |
| POST | /students/edit |  | id,name,age,gender,hobbies | 处理编辑请求（改） |
| GET | /students/delete | id |  | 处理删除请求（删） |



## 注意事项


```js
app.js

// 只负责作为入口函数 在其中引入其他的模块引用

router.js
// 作为路由器的分发 负责处理post 和 get 请求
// 处理 post 请求时  需要在 app.js 中引入 

```


```js
// 使用 post 表单处理数据 需要引入 body-parser
// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```


```js
students.js
// 作为数据处理模块 只负责封装一些方法 API 给router.js 使用
// 使用回调函数进行数据的处理
callback = function(err){}


```


# 改进版本

### 路由设计

| 请求方法 | 请求路径 | get参数 | post请求参数 | 备注 |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |
| GET | / |  |  | 首页登录系统 |
| POST | / |  | name admin | 验证登录密码 |
| GET | /students |  |  | 渲染首页 |
| GET | /students/new |  |  | 渲染添加信息页面 |
| POST | /students/new |  | name,age,describe | 添加表单提交范 |
| GET | /students/edit | id |  | 渲染编辑页面 |
| POST | /students/edit |  | id,name.age,describe | 修改表单数据提交 |
| get | /students/delet | id |  | 处理删除 |


### APT封装


| 方法名称 | 方法参数 | 方法作用  |
| --- | --- | --- |
| login | (id,callback) | 验证登录  |
| find | (callback) | 提取数据渲染首页 |
| save | (student,callback) | 保存添加的信息  |
| findById | (id,callback) | 根据传入的id查找元素 |
| updateById | (id,callback) | 编辑的信息提交 |
| deleteById | (id,callback) | 根据传入的id删除相关数据 |


## 项目预览
![](https://ws4.sinaimg.cn/large/006tKfTcly1g0hwda49cgj30ll0bmwey.jpg)

![](https://ws3.sinaimg.cn/large/006tKfTcly1g0hwdt5s55j311g0dddhd.jpg)

![](https://ws1.sinaimg.cn/large/006tKfTcly1g0hwe2348mj30wt0ef0tb.jpg)