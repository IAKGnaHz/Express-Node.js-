const fs = require('fs')

exports.login = function (user, callback) {
  fs.readFile('./user.json', function (err, data) {
    if (err) {
      return callback(err)
    }
    var users = (JSON.parse(data.toString())).users

    for (let i = 0; i < users.length; i++) {
      while (users[i].name === user.name && users[i].admin === user.admin) {
        callback(null, true)
      }
    }
  })
}

exports.find = function (callback) {
  fs.readFile('./db.json', function (err, data) {
    if (err) {
      return callback(err)
    }
    var users = (JSON.parse(data.toString())).users
    callback(null, users)
  })
}

exports.save = function (user, callback) {
  fs.readFile('./db.json', function (err, data) {
    if (err) {
      return callback(err)
    }
    var users = (JSON.parse(data.toString())).users
    user.id = users[users.length - 1].id + 1
    users.push(user)
    var fileData = JSON.stringify({
      users: users
    })

    fs.writeFile('./db.json', fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

exports.findById = function (id, callback) {
  fs.readFile('./db.json', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).users
    var stu = students.find(function (item) {
      return item.id == parseInt(id)
    })
    callback(null, stu)
  })
}

exports.updateById = function (user, callback) {
  fs.readFile('./db.json', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).users
    var userId = parseInt(user.id)
    var stu = students.find(function (item) {
      return item.id == userId
    })

    // 遍历实现拷贝
    for (var key in stu) {
      stu[key] = user[key]
    }

    var fileData = JSON.stringify({
      users: students
    })

    fs.writeFile('./db.json', fileData, function (err) {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

exports.deleteById = function (id, callback) {
  fs.readFile('./db.json', function (err, data) {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).users
    var delId = students.findIndex(function (item) {
      return item.id == parseInt(id)
    })
    students.splice(delId, 1)

    var fileData = JSON.stringify({
      users: students
    })

    fs.writeFile('./db.json', fileData, function(err) {
      if(err) {
        return  callback(err)
      }
      callback(null)
    })
  })
}