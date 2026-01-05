// CommonJS规范
// require('路径') 引入文件
// module.exports={} 抛出变量
// 在node文件中每个js文件都是一个单独的模块
// 引入其它JS文件, 接收其它JS文件抛出的变量

const obj=require('./commen.js')

console.log(obj)

const a=100

console.log("运行结果为:",a)

for (let i=0;i<10;i++){
    console.log(i)
}

// 使用其它JS文件中的变量 加上其前缀

console.log(obj.format(Date.now()*1))

