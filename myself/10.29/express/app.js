
const express = require('express')
const fs = require('fs')
const path = require('path')


// 创建服务器应用
const app = express()

// 处理静态资源
app.use(express.static('./dist'))

// 让post接口可以接收json格式的参数
app.use(express.json())

// 让post接口可以接受urlencoded格式的参数   如‘name=小明&age=18’
app.use(express.urlencoded())

// 定义get接口
app.get('/api/user/list', (req, res) => {
    console.log('前端传入的参数', req.query)
    const { page, pagesize } = req.query
    // 读取数据库
    const userList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
    // 把前端传入的参数合并到数据库中
    const values = userList.slice((page - 1) * pagesize, page * pagesize)
    // 返回数据给前端
    res.send({
        code: 200,
        msg: '成功',
        values,
        total: userList.length
    })
})


// 定义post接口
app.post('/api/create', (req, res) => {
    console.log('前端post传入的参数', req.body)
    // 读取数据库
    const userList = JSON.parse(fs.readFileSync(path.join(__dirname, './data/userlist.json'), 'utf-8'))
    // 将前端传入的参数添加到数据中
    userList.unshift({
        id: Date.now() + '',
        ...req.body
    })
    console.log(userList)
    // 重新书写覆盖
    fs.writeFileSync(path.join(__dirname, './data/userlist.json'), JSON.stringify(userList))
    res.send({
        code: 200,
        msg: '创建成功'
    })
})

// 删除接口
app.post('/api/remove',(req,res)=>{
    console.log('前端post传入的参数',req.body)
    const{id}=req.body
    const userList=JSON.parse(fs.readFileSync(path.join(__dirname,'./data/userlist.json'),'utf-8'))
    const index=userList.findIndex(v=>v.id===id)
    if(index>-1){
        userList.splice(index,1)
        fs.writeFileSync(path.join(__dirname,'./data/userlist.json'),JSON.stringify(userList))
        res.send({
            code:200,
            message:'删除成功'
        })
    }else{
        res.send({
            code:1000,
            message:'删除失败，用户不存在'
        })
    }
})
// 编辑接口
app.post('/api/edit',(req,res)=>{
    console.log('前端post传入的参数',req.body)
    const {id,...other}=req.body
    const userList=JSON.parse(fs.readFileSync(path.join(__dirname,'./data/userlist.json'),'utf-8'))
    const index=userList.findIndex(v=>v.id===id)
    if(index>-1){
        userList.splice(index,1,
            {
                ...userList[index],
                ...other
            }
        )
        fs.writeFileSync(path.join(__dirname,'./data/userlist.json'),JSON.stringify(userList))
        res.send({
            code:200,
            message:'编辑成功'
        })
    }
    else{
        res.send({
            code:1000,
            message:'编辑失败，用户不存在'
        })
    }
})




// 设置接口并监听
const PORT = 5050
app.listen(PORT, () => {
    console.log(`running http://localhost:${PORT}`)
    console.log(`running http://127.0.0.1:${PORT}`)
    console.log(`running http://10.55.5.7:${PORT}`)
})