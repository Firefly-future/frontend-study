const Mock = require('mockjs')
const fs = require('fs')
const path = require('path')

const data = Mock.mock({
  'list|300': [
    {
      'index|+1': 0,
      'id': '@id',
      'name': '@cname',
      'age|18-30': 18,
      'gender|0-1': 0,
      'address': '@address' 
    }
  ]
})

fs.writeFileSync(path.join(__dirname, './userlist.json'), JSON.stringify(data.list))

