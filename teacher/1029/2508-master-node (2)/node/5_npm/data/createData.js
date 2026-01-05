const Mock = require('mockjs')
const fs = require('fs')
const path = require('path')

const data = Mock.mock({
  "list|300": [
    {
      "index|+1": 0,
      "id": "@id",
      "name": "@cname",
      "email": "@email",
      "address": "@address",
      "age|18-40": 18,
      "date": "@date"
    }
  ]
})

console.log(data.list)
fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(data.list))