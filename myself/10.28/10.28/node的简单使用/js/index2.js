
// node内置包，操作文件（创建、删除、修改等）
const fs = require('fs')

// node 内置包，处理路径
const path = require('path')

// // 读取文件
// fs.readFile('../json/index.json',"utf-8",(err,data)=>{
//     if(err){
// //         console.log('读取失败',err)
// //     }else{
// //         console.log('读取成功',data)
// //     }
// // })

// try{
//     const data=fs.readFileSync('../json/index.json','utf-8')
//     console.log('读取成功',JSON.parse(data))
// }catch(e){
//     console.log('读取失败',e)
// }

// 写文件 如果没有就创建文件
// fs.writeFileSync('./data.json','[{},{},{}]')

// // 追加文件内容
// fs.appendFileSync('./data.json','112154689')

// 删除文件

// fs.unlink('./data.json',err=>{
//     console.log('删除失败',err)
// })

// 判断文件是否存在
// if(fs.existsSync('./data.json')){
//     fs.unlinkSync('./data.json')
// }else{
//     console.log('此文件不存在')
// }

// 拷贝
// fs.copyFileSync('./data.json','../json/data.json')

// 修改文件名
// fs.renameSync('./data.json','./data222.json')

// 获取文件信息
// const info=fs.statSync('./data222.json')
// console.log('是不是文件',info.isFile())
// console.log('是不是文件夹',info.isDirectory())

// 创建文件夹
// fs.mkdirSync('./abc')

// 删除文件夹（只能删除空的文件夹）
// fs.rmdirSync('./abc')

// 读取文件夹目录

// const menu = fs.readdirSync(path.join(__dirname, './data.json'))
// console.log(menu)

// console.log('当前文件夹的绝对路径',__dirname)
// console.log('当前文件的绝对路径',__filename)

// // 拼接路径
// console.log(path.join('a/b/c','./d/e/f','h','../g'))

// // 返回绝对路径
// console.log(path.resolve('a/b/c','./d/e/f','h','../g'))


// console.log(__dirname+'./data.json')

// console.log(path.join(__dirname,'./data.json'))