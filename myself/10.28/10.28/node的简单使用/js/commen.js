

const  st='abcdefghijklmnopqrstuvwxyz'

const addZero=n=>n<10?'0'+n:''+n

const format=time=>new Date(time).toLocaleString()

console.log('123456789')
console.log('我是工具js')

// 将工具变量函数抛出
module.exports={
    addZero,
    format
}