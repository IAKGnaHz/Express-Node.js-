// 引入常用模块

const express = require('express')
const bodyParser = require('body-parser')

const template = require('art-template')

const app = express()


app.use(bodyParser.json())
//  使用 body-parser
app.use(bodyParser.urlencoded({ extended : true}))
// parse application/json

const router = require('./router')

app.use(router)

//启动 渲染模板 表示遇到 html 结尾的使用渲染模板
app.engine('html', require('express-art-template'))


app.use('/public/',express.static('./public/'))

app.listen(3000,function(err){
  if(err) {
    return 'Server Error!!!'
  }
})


