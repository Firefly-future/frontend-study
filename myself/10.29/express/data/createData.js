const Mock=require('mockjs')
const fs=require('fs')
const path=require('path')

const data=Mock.mock(
    {
        'list|300':[
            {
                'id':'@id',
                'email':'@email',
                'address':'@county',
                'date':'@date',
                'time':'@time',
                'cname':'@cname'
            }
        ]
    }
)

console.log(data)

fs.writeFileSync(path.join(__dirname,'./userlist.json'),JSON.stringify(data.list))