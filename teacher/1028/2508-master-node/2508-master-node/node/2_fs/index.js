// node 内置包，操作文件（创建、修改、删除、移动......）
const fs = require('fs')
// node 内置包，处理路径
const path = require('path')

// 读取文件
// fs.readFile('./data111.json', 'utf-8', (err, data) => {
//   if (err) {
//     console.log('读取失败', err)
//   } else {
//     console.log('读取成功', data)
//   }
// })

// try {
//   const data = fs.readFileSync('./data.json', 'utf-8')
//   console.log('读取文件成功', JSON.parse(data))
// } catch(e) {
//   console.log('读取文件失败', e)
// }


// 写文件(覆盖文件内容，如果此文件不存在就创建文件)
// fs.writeFileSync('./data1.json', '[{}, {}, {}, {}]')


// 追加文件内容
// fs.appendFileSync('./data1.json', '1111111')

// 删除文件
// fs.unlink('./data1.json', err => {
//   console.log('删除失败', err)
// })

// 判断文件是否存在
// if (fs.existsSync('./data1.json')) {
//   fs.unlinkSync('./data1.json')
// } else {
//   console.log('此文件不存在！！！')
// }

// 拷贝
// fs.copyFileSync('./data.json', './data/data1.json')

// 修改文件名称
// fs.renameSync('./abc.json', './data/aaa.json')

// 获取文件信息
// const info = fs.statSync('./data')
// console.log('是不是文件', info.isFile())
// console.log('是不是文件夹', info.isDirectory())


// 创建文件夹
// fs.mkdirSync('./abc')

// 删除文件夹(只能删除空文件夹)
// fs.rmdirSync('./data')

// 读取文件夹目录
// const menu = fs.readdirSync(path.join(__dirname, './data'))
// console.log(menu)

// 注意：fs 中使用相对路径时，相对的是执行命令时终端的路径，不是相对于代码文件的路径
// console.log('当前文件夹的绝对路径', __dirname)
// console.log('当前文件的绝对路径', __filename)

// 拼接路径
console.log(path.join('a/b/c/', './d/e/f/g', '/h', '../j'))
// 返回绝对路径
console.log(path.resolve('a/b/c/', '/d/e/f/g', 'h', '../j'))


// console.log(__dirname + './data.json')
// console.log(path.join(__dirname, './data.json'))


console.log('=========== end ===========')
