const Mock = require('mockjs')
const fs = require('fs')
const path = require('path')

const data = Mock.mock({
    'list|300': [{
        'id|+1': '@id',
        'name': '@name',
        'cname': '@cname',
        'address': '@region',
        'province': '@province',
        'city': '@city',
        'cunty': '@county',
        'email': '@email',
        'age|18-45': 18,
        'date': '@date(yyyy:MM:dd)'
    }]
})

console.log(data.list)

fs.writeFileSync(path.join(__dirname, './userlist.json'), JSON.stringify(data.list))


// const Mock = require('mockjs')
// const fs = require('fs')
// const path = require('path')

// const data = Mock.mock({
//   'list|300': [
//     {
//       'index|+1': 0,
//       'id': '@id',
//       'name': '@cname',
//       'age|18-30': 18,
//       'gender|0-1': 0,
//       'address': '@address' 
//     }
//   ]
// })

// fs.writeFileSync(path.join(__dirname, './userlist.json'), JSON.stringify(data.list))

