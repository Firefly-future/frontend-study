// CommonJS 规范
// require('xxx路径') 引入文件
// module.exports = {}  抛出变量

// 在 node 中每个 js 文件都是一个独立的模块
// 引入其他 js 文件，接收其他文件抛出的变量
const utils = require('./utils.js')

console.log(utils)

const a = 100


console.log('运行结果', a)

for (let i = 0; i < 10; i++) {
  console.log(i)
}

console.log(utils.addZero(8))
