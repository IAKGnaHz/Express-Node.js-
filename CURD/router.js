const express = require('express')

const router = express.Router()

const api = require('./API')


router.get('/', function (req, res) {
  res.render('index.html')
})

router.post('/login', function (req, res) {
  api.login(req.body,function (err) { 
    if(err) {
      return res.status(500).end('Server Error..')
    }
    res.render('success.html')
  })
})

router.get('/students', function (req, res) {
  api.find(function(err,users){
    if(err) {
      return res.status(500).end('Server Error..')
    }
    res.render('students.html',{
      students : users
    })
  })
})


router.get('/students/new', function (req, res) {
  res.render('new.html')
})

router.post('/students/new',function (req, res) {
  api.save(req.body,function(err){
    if(err) {
      return res.status(500).end('Server Error..')
    }
    res.redirect('/students')
  })
})

router.get('/students/edit', function (req, res) {
  api.findById(parseInt(req.query.id),function(err,student) {
    if(err){
      return res.status(500).end('Server Error..')
    }
    res.render('edit.html',{
      student : student
    })
  })
})

router.post('/students/edit', function (req, res) {
  api.updateById(req.body,function(err) {
    if(err) {
      return res.status(500).end('Server Error..')
    }
    res.redirect('/students')
  })
})

router.get('/students/delete', function (req, res) {
  api.deleteById(parseInt(req.query.id),function(err){
    if(err){
      return res.status(500).end('Server Error..')
    }
    res.redirect('/students')
  })
})

module.exports = router